/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-properties */
import model from '../models';
import StatusResponse from '../helpers/StatusResponse';
import {
  checkIdentifier,
  pageInfo,
  checkTitle,
  checkArticle,
  checkUser
} from '../helpers/articleHelper';

const { articles } = model;
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
    try {
      const articleTitle = await articles.findOne({
        where: {
          title: req.body.title
        }
      });
      const articleSlug = checkTitle(req.body.title, articleTitle);
      const newArticle = await articles.create({
        userId: req.userId,
        title: req.body.title,
        description: req.body.description,
        slug: articleSlug,
        body: req.body.body,
        image: req.body.image
      });

      StatusResponse.created(res, {
        message: 'Article successfully created',
        article: newArticle
      });
    } catch (error) {
      StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
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
    let page = 1;
    const { size } = req.query;
    ({ page } = req.query);

    try {
      const total = await articles.count();
      const { limit, offset } = pageInfo(total, page, size);
      const fetchArticles = await articles.findAndCountAll({
        limit,
        offset,
        order: ['createdAt']
      });
      if (fetchArticles.length === 0) {
        StatusResponse.success(res, {
          message: 'No article found'
        });
      } else {
        StatusResponse.success(res, {
          message: 'List of articles',
          articles: fetchArticles
        });
      }
    } catch (error) {
      StatusResponse.internalServerError(res, {
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
    const paramsSlug = checkIdentifier(req.params.identifier);

    try {
      const fetchArticle = await articles.findOne({
        where: { ...paramsSlug }
      });
      if (!fetchArticle) {
        StatusResponse.notfound(res, {
          message: 'Could not find article'
        });
      } else {
        StatusResponse.success(res, {
          message: 'success',
          article: fetchArticle
        });
      }
    } catch (error) {
      StatusResponse.internalServerError(res, {
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
    const paramsSlug = checkIdentifier(req.params.identifier);
    const article = await articles.findOne({
      where: {
        ...paramsSlug
      },
    });
    checkArticle(res, article);
    checkUser(req, res, article);
    try {
      const data = Object.keys(req.body);
      const updatedArticle = await articles.update(req.body, {
        where: { ...paramsSlug },
        fields: data,
        returning: true,
        plain: true
      });

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
    const paramsSlug = checkIdentifier(req.params.identifier);
    const article = await articles.findOne({
      where: {
        ...paramsSlug
      },
    });
    checkArticle(res, article);
    checkUser(req, res, article);
    try {
      const data = { isArchived: true };
      await articles.update(data, {
        where: { ...paramsSlug },
        returning: true,
        plain: true
      });
      return StatusResponse.success(res, {
        message: 'Article archived successfully'
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }
}

export default ArticlesController;
