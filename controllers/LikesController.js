import Model from '../models';

/** @description usersController class
 * @return {object} the response object
 * @public
 */
class PasswordResetController {
  /** @description it sends a mail to a user that forgot his password
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async likesArticles(req, res) {
      const {article} = Model;
      const {articleId} = req.params;
      const { userId } = res.locals.user;

      
  }
    
}
export default PasswordResetController;
