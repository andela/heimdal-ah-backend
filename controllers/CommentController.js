import db from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { comments, users } = db;
/**
 * @description CommentController class
 */
class CommentController {
  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async create(req, res) {
    const { content } = req.body;
    const { id } = req.params;
    const { userId } = res.locals.user;

    try {
      const comment = await comments.create({
        userId,
        articleId: id,
        content
      });
      const payload = {
        message: 'Comment has been successfully created',
        comment
      };
      return StatusResponse.created(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully create a Comment',
        error: {
          body: [`Internal server error => ${error}`]
        }
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }

  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async list(req, res) {
    const { id } = req.params;
    try {
      const comment = await comments.findAll({
        include: [
          users,
        ],
        where: {
          articleId: id,
          isArchived: false,
          isAnUpdate: false
        }
      });
      if (comment.length === 0) {
        const payload = {
          message: 'No Comment exist'
        };
        return StatusResponse.notfound(res, payload);
      }
      const payload = {
        message: 'All Comment for the Article',
        comment
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully list out Comments',
        error: {
          body: [`Internal server error => ${error}`]
        }
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }

  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async archive(req, res) {
    const { commentId } = req.params;
    try {
      comments.update({
        isArchived: true,
      }, {
        where: {
          id: commentId
        }
      });
      const payload = {
        message: 'Successfully deleted'
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully delete a Comment',
        error: {
          body: [`Internal server error => ${error}`]
        }
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }
}

export default CommentController;