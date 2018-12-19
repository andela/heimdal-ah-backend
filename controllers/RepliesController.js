import StatusResponse from '../helpers/StatusResponse';
import ReplyQueryModel from '../lib/ReplyQueryModel';

/**
 * @description CommentController class
 */
class RepliesController {
  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async create(req, res) {
    const { content } = req.body;
    const { commentId } = req.params;
    const { userId } = req.app.locals.user;
    try {
      const info = {
        content,
        commentId,
        userId
      };
      const replies = await ReplyQueryModel.createReplies(info);
      const payload = {
        message: 'Reply has been successfully created',
        replies
      };
      return StatusResponse.created(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully create a reply',
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
    const { commentId } = req.params;
    try {
      const commentReplies = await ReplyQueryModel.listCommentReplies(commentId);
      if (commentReplies.length === 0) {
        const payload = {
          message: 'No reply exist for this comment'
        };
        return StatusResponse.notfound(res, payload);
      }
      const payload = {
        message: 'All replies for the comment',
        commentReplies
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully list out Comments',
        error: {
          body: [`Internal server error => ${error.message}`]
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
    const { replyId } = req.params;
    try {
      await ReplyQueryModel.archiveReply(replyId);
      const payload = {
        message: 'Successfully deleted'
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully delete the reply',
        error: {
          body: [`Internal server error => ${error}`]
        }
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }
}

export default RepliesController;
