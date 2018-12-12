
import Models from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { bookmarks, articles } = Models;
/** @description usersController class
 * @return {object} the response object
 * @public
 */
class BookmarksController {
  /** @description create a bookmark
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async create(req, res) {
    const { userId } = req.decoded;
    const { articleId } = req.params;
    let { title } = req.body;

    if (!title) {
      title = `untitled ${articleId}`;
    }

    try {
      const bookmark = await bookmarks.create({
        title,
        userId,
        articleId
      });

      if (!bookmark) {
        return StatusResponse.badRequest(res, { message: 'error posting bookmark' });
      }

      return StatusResponse.success(res, { message: 'hurray! bookmark was added successfully' });
    } catch (error) {
      return StatusResponse.internalServerError(error);
    }
  }

  /** @description get one bookmark
   * @param {object} req is the request parameter
   * @param {object} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async search(req, res) {
    const { title } = req.body;
    const { userId } = req.decoded;

    if (!title) {
      return StatusResponse.badRequest(res, { message: 'please insert a title' });
    }

    const bookmark = await bookmarks.findAll({
      where: {
        title,
        userId,
      },
      include: [{
        model: articles,
        as: 'article'
      }]
    });
    if (!bookmark) {
      return StatusResponse.notfound(res, { message: 'no bookmark found' });
    }
    return StatusResponse.success(res, bookmark);
  }

  /** @description get all bookmarks
   * @param {object} req is the request parameter
   * @param {object} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async getAll(req, res) {
    const { userId } = req.decoded;

    const bookmark = await bookmarks.findAll({
      where: {
        userId
      },
      include: [{
        model: articles,
        as: 'article'
      }]
      // name title and link
    });
    if (!bookmark) {
      return StatusResponse.notfound(res, { message: 'no bookmark found' });
    }
    return StatusResponse.success(res, bookmark);
  }

  /** @description Delete a bookmark
   * @param {object} req is the request parameter
   * @param {object} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async delete(req, res) {
    const { userId } = req.decoded;
    const { bookmarkId } = req.params;

    const bookmark = await bookmarks.destroy({
      where: {
        id: bookmarkId,
        userId
      }
    });
    if (!bookmark) {
      return StatusResponse.notfound(res, { message: 'bookmark was not found' });
    }
    return StatusResponse.success(res, { message: 'bookmark was deleted successfully' });
  }
}
export default BookmarksController;
