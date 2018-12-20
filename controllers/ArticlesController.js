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
import ReadingStatsModelQuery from '../lib/ReadingStatsModelQuery';
import eventEmitter from '../helpers/eventEmitter';
import eventTypes from '../events/eventTypes';

const { articles: Article, tags: Tag, HighlightedText } = models;

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
      const articleTitle = await ArticleQueryModel.getArticleByTitle(req.body.title);
      const articleSlug = checkTitle(req.body.title, articleTitle);
      const readingTime = calcReadingTime(body);
      const newArticle = await Article.create({
        userId,
        title,
        description,
        body,
        image,
        readingTime,
        slug: articleSlug
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
    const {
      size = 20, order = 'ASC', orderBy = 'id', offset = 0
    } = req.query;
    try {
      const articles = await Article.findAndCountAll({
        include: [
          {
            model: Tag,
            as: 'tags',
            attributes: ['tagName'],
            through: {
              attributes: []
            }
          }
        ],
        order: [[orderBy, order]]
      });
      if (articles.length === 0) {
        return StatusResponse.success(res, {
          message: 'No article found'
        });
      }
      return StatusResponse.success(res, {
        message: 'List of articles',
        articles,
        ...pagination(articles, offset, size)
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
    const whereFilter = checkIdentifier(req.params.identifier);

    try {
      const fetchArticle = await Article.findOne({
        where: { ...whereFilter },
        include: [
          {
            model: Tag,
            as: 'tags',
            attributes: ['tagName'],
            through: {
              attributes: []
            }
          },
          {
            model: HighlightedText,
            as: 'highlightedPortions'
          }
        ]
      });
      if (req.app.locals.user) {
        const { userId } = req.app.locals.user;
        const readInfo = {
          articleId: fetchArticle.id,
          userId
        };
        await ReadingStatsModelQuery.createReaderStats(readInfo);
      }
      return StatusResponse.success(res, {
        message: 'success',
        article: fetchArticle
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error.message}`
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
    const whereFilter = checkIdentifier(req.params.identifier);

    const { body, title, tags } = req.body;
    try {
      const article = await ArticleQueryModel.getArticleByIdentifier(whereFilter);
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
        where: { ...whereFilter },
        fields: ['slug', 'title', 'body', 'readingTime', 'description', 'image', 'isPublished'],
        returning: true
      });

      if (tags) {
        const createdTags = await createNewTags(tags);
        await article.setTags(createdTags);
        updatedArticle['1']['0'].dataValues.tags = tags;
      }

      // Use an event emitter to call updateHighlights
      eventEmitter.emit(
        eventTypes.UPDATEHIGHLIGHT_EVENT,
        article.highlightedPortions,
        updatedArticle[1][0].body,
        userId
      );

      return StatusResponse.success(res, {
        message: 'Article updated successfully, some highlights were adjusted or removed',
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
    const whereFilter = checkIdentifier(req.params.identifier);
    try {
      const article = await ArticleQueryModel.getArticleByIdentifier(whereFilter);
      if (!checkUser(article, userId)) {
        return StatusResponse.forbidden(res, {
          message: 'Request denied'
        });
      }
      const data = { isArchived: true };
      await articles.update(data, {
        where: { ...whereFilter },
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
