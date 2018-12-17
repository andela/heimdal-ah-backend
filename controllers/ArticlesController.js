import models from '../models';
import StatusResponse from '../helpers/StatusResponse';
import pagination from '../helpers/pagination';
import ArticleQueryModel from '../lib/ArticleQueryModel';
import {
  checkIdentifier,
  checkUser,
  checkTitle,
  createNewTags,
  calcReadingTime
} from '../helpers/articleHelper';

const { articles: Article, tags: Tag } = models;

/**
 * @description ArticlesController class
 */
class ArticlesController {
  /**
   * @description - create articles
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async create(req, res) {
    const { userId } = req.app.locals.user;
    const {
      tags, body, title, description, image
    } = req.body;
    try {
      const articleTitle = await ArticleQueryModel.getArticleByTitle();
      const articleSlug = checkTitle(req.body.title, articleTitle);
      const readingTime = calcReadingTime(body);
      const newArticle = await Article.create({
        userId,
        title,
        description,
        body,
        image,
        readingTime,
        slug: articleSlug,
      });

      if (tags) {
        const createdTags = await createNewTags(tags);
        await newArticle.addTags(createdTags);
        newArticle.dataValues.tags = tags;
      }

      const payload = { article: newArticle, message: 'Article successfully created' };
      return StatusResponse.created(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `Something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description - list articles
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async list(req, res) {
    const { articles } = models;
    const {
      size, page = 1, order = 'ASC', orderBy = 'id'
    } = req.query;
    try {
      const fetchhArticles = await articles.findAndCountAll({
        include: {
          model: Tag,
          as: 'tags',
          attributes: ['tagName'],
          through: {
            attributes: []
          }
        },
        order: [[orderBy, order]]
      });

      const {
        limit, offset, totalPages, currentPage
      } = pagination(page, size, fetchhArticles.count);
      const fetchedArticles = fetchhArticles.rows.slice(offset, parseInt(offset, 10)
      + parseInt(limit, 10));

      if (fetchedArticles.length === 0) {
        return StatusResponse.success(res, {
          message: 'No article found'
        });
      }
      return StatusResponse.success(res, {
        message: 'List of articles',
        articles: fetchedArticles,
        metadata: {
          count: fetchhArticles.count,
          currentPage,
          articleCount: fetchedArticles.length,
          limit,
          totalPages
        }
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description - fetch single article
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async get(req, res) {
    const whereClause = checkIdentifier(req.params.identifier);

    try {
      const fetchArticle = await Article.findOne({
        where: { ...whereClause },
        include: {
          model: Tag,
          as: 'tags',
          attributes: ['tagName'],
          through: {
            attributes: []
          }
        },
      });
      return StatusResponse.success(res, {
        message: 'success',
        article: fetchArticle
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description - update article
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async update(req, res) {
    const { articles } = models;
    const { userId } = req.app.locals.user;
    const whereClause = checkIdentifier(req.params.identifier);

    const { body, title, tags } = req.body;
    try {
      const article = await ArticleQueryModel.getArticleByIdentifier(whereClause);
      if (!checkUser(article, userId)) {
        return StatusResponse.forbidden(res, {
          message: 'Request denied'
        });
      }
      if (title) {
        req.body.slug = checkTitle(title, title);
      }
      if (body) {
        req.body.readingTime = calcReadingTime(body);
      }

      const updatedArticle = await articles.update(req.body, {
        where: { ...whereClause },
        fields: ['title', 'body', 'readingTime', 'description', 'image', 'isPublished'],
        returning: true,
      });

      if (tags) {
        const createdTags = await createNewTags(tags);
        await article.setTags(createdTags);
        updatedArticle['1']['0'].dataValues.tags = tags;
      }

      return StatusResponse.success(res, {
        message: 'Article updated successfully',
        article: updatedArticle
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description - delete article
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async archive(req, res) {
    const { articles } = models;
    const { userId } = req.app.locals.user;
    const whereClause = checkIdentifier(req.params.identifier);
    try {
      const article = await ArticleQueryModel.getArticleByIdentifier(whereClause);
      if (!checkUser(article, userId)) {
        return StatusResponse.forbidden(res, {
          message: 'Request denied'
        });
      }
      const data = { isArchived: true };
      await articles.update(data, {
        where: { ...whereClause },
        returning: true,
        plain: true
      });
      return StatusResponse.success(res, {
        message: 'Article deleted(archived) successfully'
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }
}

export default ArticlesController;
