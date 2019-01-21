import model from '../models';
import StatusResponse from '../helpers/StatusResponse';
import { ratingEvent } from '../lib/events';

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
  static async create(req, res) {
    const { userId } = req.app.locals.user;
    const { articleId } = req.params;
    try {
      const usersRatings = await ratings.create({
        userId,
        articleId,
        stars: req.body.stars
      });

      const info = { userId, articleId, usersRatings };
      ratingEvent(info);


      StatusResponse.created(res, {
        message: 'Users ratings on this article recorded succesfully',
        ratings: usersRatings
      });
    } catch (error) {
      StatusResponse.internalServerError(res, {
        message: 'users ratings not recorded succesfully, please try again',
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }

  /**
   * @description - This method takes care of retrieving ratings on an article by all users
   * @param {object} req
   * @param {object} res
   * @returns {object} Ratings on an article
   */
  static async retrieve(req, res) {
    try {
      const returnedRatings = await ratings.findAndCountAll({
        where: {
          articleId: req.params.articleId
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'articleId'] }
      });
      if (returnedRatings.count >= 1) {
        StatusResponse.success(res, {
          message: 'Ratings on this article returned succesfully',
          ratings: returnedRatings
        });
      } else {
        StatusResponse.notfound(res, {
          message: 'No Ratings found for this article',
          ratings: null
        });
      }
    } catch (error) {
      StatusResponse.internalServerError(res, {
        message: 'Ratings not returned succesfully, please try again',
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }
}

export default RatingsController;
