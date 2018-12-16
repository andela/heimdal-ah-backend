import model from '../models';
import StatusResponse from '../helpers/StatusResponse';
import pagination from '../helpers/pagination';
import {
  checkIdentifier,
  generateSlug,
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
    const { userId } = res.locals.user;
    try {
      const articleTitle = await articles.findOne({ where: { title: req.body.title } });
      const articleSlug = generateSlug(req.body.title, articleTitle);
      const newArticle = await articles.create({
        userId,
        title: req.body.title,
        description: req.body.description,
        slug: articleSlug,
        body: req.body.body,
        image: req.body.image
      });

      return StatusResponse.created(res, {
        message: 'Article successfully created',
        article: newArticle
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
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
    const {
      size, page = 1, order = 'ASC', orderBy = 'createdAt'
    } = req.query;

    try {
      const { limit, offset } = pagination(page, size);
      const fetchArticles = await articles.findAndCountAll({
        limit,
        offset,
        order: [[orderBy, order]]
      });
      if (fetchArticles.length === 0) {
        return StatusResponse.success(res, {
          message: 'No article found'
        });
      }
      const { rows, count } = fetchArticles;
      const totalPages = Math.ceil(count / limit);
      const total = rows.length;
      return StatusResponse.success(res, {
        message: 'List of articles',
        articles: fetchArticles,
        metadata: {
          page,
          total,
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
      const fetchArticle = await articles.findOne({
        where: { ...whereClause }
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
    const { userId } = res.locals.user;
    // const whereClause = checkIdentifier(req.params.identifier);
    try {
      const article = await articles.findOne({
        where: {
          id: req.params.id
        },
      });
      if (!checkUser(article, userId)) {
        return StatusResponse.forbidden(res, {
          message: 'Request denied'
        });
      }

      const data = Object.keys(req.body);
      const updatedArticle = await articles.update(req.body, {
        where: { id: req.params.id },
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
    const { userId } = res.locals.user;
    try {
      const article = await articles.findOne({
        where: {
          id: req.params.id
        },
      });
      if (!checkUser(article, userId)) {
        return StatusResponse.forbidden(res, {
          message: 'Request denied'
        });
      }
      const data = { isArchived: true };
      await articles.update(data, {
        where: { id: req.params.id },
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
