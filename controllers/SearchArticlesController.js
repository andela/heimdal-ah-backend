import model from '../models';
import StatusResponse from '../helpers/StatusResponse';

const {
  articles,
  ArticleTag,
} = model;

/**
 * @description - This class is all about searching and filtering articles based on parameters
 * @param {object} req
 * @param {object} res
 * @returns {class} Articles searched for
 */
class SearchArticlesController {
  /**
   * @description - This method takes care of retrieving articles by authors
   * @param {object} req
   * @param {object} res
   * @returns {object} Articles by authors
   */
  static async byAuthor(req, res) {
    try {
      const articlesByAuthor = await articles.findAndCountAll({
        where: {
          userId: req.app.locals.user.userId,
        }
      });
      if (articlesByAuthor.count >= 1) {
        StatusResponse.success(res, {
          message: 'All Articles by this author returned succesfully',
          articles: articlesByAuthor
        });
      } else {
        StatusResponse.notfound(res, {
          message: 'No Articles found',
          articles: null
        });
      }
    } catch (error) {
      StatusResponse.internalServerError(res, {
        message: 'An error occured, Articles not returned succesfully, please try again',
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }

  /**
   * @description - This method takes care of retrieving articles by title
   * @param {object} req
   * @param {object} res
   * @returns {object} Articles by title
   */
  static async byTitle(req, res) {
    try {
      const articlesByTitle = await articles.findAndCountAll({
        where: {
          title: req.query.title,
        }
      });
      if (articlesByTitle.count >= 1) {
        StatusResponse.success(res, {
          message: 'Articles with this title returned succesfully',
          articles: articlesByTitle
        });
      } else {
        StatusResponse.notfound(res, {
          message: 'No Articles with such title',
          articles: null
        });
      }
    } catch (error) {
      StatusResponse.internalServerError(res, {
        message: 'An error occured, Articles not returned succesfully, please try again',
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }

  /**
   * @description - This method takes care of retrieving articles by tags
   * @param {object} req
   * @param {object} res
   * @returns {object} Articles by tags
   */
  static async byTags(req, res) {
    try {
      const articlesByTags = await ArticleTag.findAndCountAll({
        where: {
          tagId: req.app.locals.tag.tagId
        },
        include: {
          model: articles,
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'tagId', 'articleId'] }
      });
      if (articlesByTags.count >= 1) {
        StatusResponse.success(res, {
          message: 'All Articles using these tags returned succesfully',
          articles: articlesByTags
        });
      } else {
        StatusResponse.notfound(res, {
          message: 'No Articles with such tags',
          articles: null
        });
      }
    } catch (error) {
      StatusResponse.internalServerError(res, {
        message: 'An error occured, Articles not returned succesfully, please try again',
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }
}

export default SearchArticlesController;
