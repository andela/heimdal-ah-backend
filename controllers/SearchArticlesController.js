import model from '../models';
import StatusResponse from '../helpers/StatusResponse';
import pagination from '../helpers/pagination';

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
    const {
      size, page = 1, order = 'DESC', orderBy = 'id'
    } = req.query;
    try {
      const articlesByAuthor = await articles.findAndCountAll({
        where: {
          userId: req.app.locals.user.userId,
        },
        order: [[orderBy, order]]
      });
      const {
        limit, offset, totalPages, currentPage
      } = pagination(page, size, articlesByAuthor.count);
      const fetchedArticles = articlesByAuthor.rows.slice(offset, parseInt(offset, 10)
      + parseInt(limit, 10));

      if (fetchedArticles.length >= 1) {
        StatusResponse.success(res, {
          message: 'All Articles by this author returned succesfully',
          articles: fetchedArticles,
          metadata: {
            count: articlesByAuthor.count,
            currentPage,
            articleCount: fetchedArticles.length,
            limit,
            totalPages
          }
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
