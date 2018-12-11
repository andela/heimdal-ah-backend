// import jwtDecode from 'jwt-decode';
import model from '../models';
import StatusResponse from '../helpers/StatusResponse';
import slug from '../helpers/generateSlug';

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
        userId: req.userId,
        title: req.body.title,
        description: req.body.description,
        slug: articleSlug,
        body: req.body.body,
        image: req.body.image
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
        }
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
    try {
      const article = await articles.findOne({
        where: {
          slug: req.params.slug
        },
      });
      if (!article) {
        return StatusResponse.notfound(res, {
          message: 'Could not find article'
        });
      }
      if (article.userId !== req.userId) {
        return StatusResponse.unauthenticated(res, {
          message: 'You cannot edit another persons article'
        });
      }
      const data = {
        title: req.body.title || article.title,
        description: req.body.description || article.description,
        body: req.body.body || article.body
      };
      const updatedArticle = await articles.update(
        data,
        {
          where: {
            slug: req.params.slug
          },
          returning: true,
          plain: true
        }
      );

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
  static async deleteArticle(req, res) {
    try {
      const article = await articles.findOne({
        where: {
          slug: req.params.slug
        },
      });
      if (!article) {
        return StatusResponse.notfound(res, {
          message: 'Could not find article'
        });
      }
      if (article.userId !== req.userId) {
        StatusResponse.unauthenticated(res, {
          message: 'You cannot delete another persons article'
        });
      }

      await articles.destroy({
        where: {
          slug: req.params.slug
        }
      });

      return StatusResponse.noContent(res, {
        message: 'Article deleted successfully'
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }
}

export default ArticlesController;
