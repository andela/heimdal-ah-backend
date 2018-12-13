import Models from '../models';
import StatusResponse from '../helpers/StatusResponse';

/** @description usersController class
 * @return {object} the response object
 * @public
 */
class LikesController {
  /** @description it sends a mail to a user that forgot his password
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async likesArticles(req, res) {
    const { likes } = Models;
    const { articleId } = req.params;
    const { userId } = res.locals.user;

    try {
      const like = await likes.create({
        userId,
        articleId,
      });

      if (!like) {
        return StatusResponse.badRequest(res, { message: 'error like could not be added' });
      }

      return StatusResponse.success(res, { message: 'hurray! you liked this article' });
    } catch (error) {
      return StatusResponse.internalServerError(error);
    }
  }
}
export default LikesController;
