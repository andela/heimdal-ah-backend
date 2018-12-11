import jwtDecode from 'jwt-decode';
import model from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { ratings } = model;

/**
 * @description - This class is all about users ratings of articles
 * @param {object} req
 * @param {object} res
 * @returns {class} Users
 */
class RatingsController {
  /**
   * @description - This method takes care of creating ratings on an article by a user
   * @param {object} req
   * @param {object} res
   * @returns {object} Users Ratings on an article
   */
  static async createRatings(req, res) {
    const token = req.body.token || req.query.token || req.headers['access-token'];
    const id = jwtDecode(token).userId;
    try {
      const usersRatings = await ratings.create({
        userId: id,
        articleId: req.params.articleId,
        stars: req.body.stars
      });
      if (usersRatings) {
        StatusResponse.created(res, {
          message: 'Users ratings on this article recorded succesfully',
          ratings: usersRatings
        });
      }
    } catch (error) {
      StatusResponse.internalServerError(res, {
        message: 'users ratings not recorded succesfully, please try again',
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }
}

export default RatingsController;
