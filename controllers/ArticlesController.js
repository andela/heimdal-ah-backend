import jwtDecode from 'jwt-decode';
import model from '../models';
import StatusResponse from '../helpers/StatusResponse';
import slug from '../helpers/generateSlug';
import ArticleQueryModel from '../lib/ArticleQueryModel';

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
      const articleSlug = slug(req.body.title);
      const newArticle = await articles.create({
        userId: req.params.userId,
        title: req.body.title,
        description: req.body.description,
        slug: articleSlug,
        body: req.body.body
      });
      if (newArticle) {
        StatusResponse.created(res, {
          message: 'Article successfully created',
          article: newArticle
        });
      }
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
  static async fetchArticles(req, res) {
    try {
      const fetchArticles = await articles.findAll();
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
  static async getArticle(req, res) {
    try {
      const fetchArticle = await articles.findOne({
        where: {
          slug: req.params.slug
        },
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
  static async editArticle(req, res) {
    const token = req.body.token || req.query.token || req.headers['access-token'];
    const verifiedToken = jwtDecode.verify(token, process.env.TOKEN_SECRET);
    const { userId } = verifiedToken;
    console.log(userId);


    // const decoded = jwtDecode(req.body.token).username;
    // if (decoded !== req.params.username) {
    //   StatusResponse.unauthorized(res, {
    //     errors: {
    //       body: ['You cannot edit another persons article']
    //     }
    //   });
    // }

    const article = await ArticleQueryModel.getArticleBySlug(slug);
    if (article) {
      StatusResponse.notfound(res, {
        message: 'Could not find article'
      });
    }
    const data = {
      title: req.body.title,
      description: req.body.description,
      body: req.body.body
    };
    try {
      const update = await articles.update({
        data,
        where: {
          slug: req.params.slug
        }
      });
      if (update) {
        StatusResponse.notfound(res, {
          message: 'Article updated successfully'
        });
      }
    } catch (error) {
      StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }
}

export default ArticlesController;
