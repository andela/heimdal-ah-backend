import models from '../models';
import StatusResponse from '../helpers/StatusResponse';
import {
  checkIdentifier,
  pageInfo,
  checkTitle,
  checkUser,
  createNewTags,
  calcReadingTime
} from '../helpers/articleHelper';

import highlitedTextsUpdater from '../lib/highlitedTextsUpdater';

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
      const articleTitle = await Article.findOne({
        where: {
          title: req.body.title
        }
      });
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
    const { articles } = models;

    const {
      size, page = 1, order = 'ASC', orderBy = 'createdAt'
    } = req.query;

    try {
      const { limit, offset } = pageInfo(page, size);
      const fetchArticles = await articles.findAndCountAll({
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
        ],
        limit,
        offset,
        order: [[orderBy, order]]
      });
      if (fetchArticles.length === 0) {
        return StatusResponse.success(res, {
          message: 'No article found'
        });
      }
      return StatusResponse.success(res, {
        message: 'List of articles',
        articles: fetchArticles
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
    const { articles } = models;

    const paramsSlug = checkIdentifier(req.params.identifier);

    try {
      const fetchArticle = await articles.findOne({
        where: { ...paramsSlug },
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
    const { body, title, tags } = req.body;

    const paramsSlug = checkIdentifier(req.params.identifier);
    try {
      const article = await articles.findOne({
        where: {
          ...paramsSlug
        },
        include: { model: HighlightedText, as: 'highlightedPortions' }
      });
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
        where: { ...paramsSlug },
        fields: ['title', 'body', 'readingTime', 'description', 'image', 'isPublished'],
        returning: true
      });

      if (tags) {
        const createdTags = await createNewTags(tags);
        await article.setTags(createdTags);
        updatedArticle['1']['0'].dataValues.tags = tags;
      }

      const reqBody = {
        body: updatedArticle[1][0].body,
        highlightedPortions: article.highlightedPortions
      };
      const newUpdatedPortions = await highlitedTextsUpdater(userId, article.id, reqBody, res);
      if (!newUpdatedPortions) {
        return StatusResponse.success(res, {
          message: 'Article updated successfully, no highlights weere adjusted',
          article: updatedArticle,
          highlightedPortions: article.dataValues.highlightedPortions
        });
      }
      return StatusResponse.success(res, {
        message: 'Article updated successfully, some highlights were adjusted or removed',
        article: updatedArticle,
        highlightedPortions: newUpdatedPortions
      });
    } catch (error) {
      // console.log(error);
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
    const paramsSlug = checkIdentifier(req.params.identifier);
    try {
      const article = await articles.findOne({
        where: {
          ...paramsSlug
        }
      });
      if (!checkUser(article, userId)) {
        return StatusResponse.forbidden(res, {
          message: 'Request denied'
        });
      }
      const data = { isArchived: true };
      await articles.update(data, {
        where: { ...paramsSlug }
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
