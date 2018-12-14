import { like, numOflikers } from '../helpers/likes';
import Models from '../models';
import StatusResponse from '../helpers/StatusResponse';


/** @description usersController class
 * @return {object} the response object
 * @public
 */
class LikesController {
  /** @description function to like an article
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async likesArticles(req, res) {
    const { articleId } = req.params;
    const commentId = null;
    if (!parseInt(articleId, 10)) {
      return StatusResponse.badRequest(res, { message: ' this is a bad request' });
    }
    try {
      const { articles } = Models;
      const ifExist = await articles.findOne({
        where: {
          id: articleId,
          isArchived: false
        }
      });
      if (!ifExist) {
        return StatusResponse.badRequest(res, { message: 'article does not exist' });
      }
      return like(res, articleId, commentId);
    } catch (error) {
      return StatusResponse.internalServerError(res, { message: 'server error' });
    }
  }

  /** @description function to like an article
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async likesComments(req, res) {
    const { articleId, commentId } = req.params;
    const { comments } = Models;
    if (!parseInt(commentId, 10) || !parseInt(articleId, 10)) {
      return StatusResponse.badRequest(res, { message: ' this is a bad request' });
    }
    try {
      const ifExist = await comments.findOne({
        where: {
          id: commentId,
          articleId,
          isArchived: false
        }
      });
      if (!ifExist) {
        return StatusResponse.badRequest(res, { message: 'comment does not exist' });
      }
      return like(res, articleId, commentId);
    } catch (error) {
      return StatusResponse.internalServerError(res, { message: 'server error' });
    }
  }

  /** @description get all likes
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async getAriticles(req, res) {
    const { articleId } = req.params;
    const { articles } = Models;

    if (!parseInt(articleId, 10)) {
      return StatusResponse.badRequest(res, { message: ' this is a bad request' });
    }
    try {
      const ifExist = await articles.findOne({
        where: {
          id: articleId,
          isArchived: false
        }
      });
      if (!ifExist) {
        return StatusResponse.badRequest(res, { message: 'article does not exist' });
      }
      return numOflikers(res, articleId);
    } catch (error) {
      return StatusResponse.internalServerError(res, { message: 'server error' });
    }
  }
}
export default LikesController;
