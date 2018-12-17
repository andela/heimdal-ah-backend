import models from '../models';
import StatusResponse from '../helpers/StatusResponse';
import { checkUser } from '../helpers/articleHelper';

const { comments, articles } = models;

/**
 * @description CommentController class
 */
class CommentHistoriesController {
  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request Object
   * @param {Object} res - HTTP Response Object
   * @return {Object} Returned Object
   */
  static async createCommentHistory(req, res) {
    const { content } = req.body;
    const { articleId, commentId } = req.params;
    const { userId } = req.app.locals.user;

    try {
      const latestComment = await comments.findOne({
        where: {
          articleId, id: commentId, isArchived: false, commentId: null,
        },
        attributes: { exclude: ['id'] },
        include: [{
          model: articles,
          where: {
            isArchived: false
          },
          attributes: []
        }],
      });

      if (!latestComment) {
        return StatusResponse.notfound(res, {
          message: 'Comment not Found'
        });
      }

      if (!checkUser(latestComment.dataValues, userId)) {
        return StatusResponse.forbidden(res, {
          message: 'Not Authorised'
        });
      }

      latestComment.commentId = commentId;

      const updatedComment = await comments.update({
        articleId,
        content,
        commentId: null,
        userId,
      }, {
        where: { id: commentId },
        returning: true,
        plain: true,
        limit: 1
      });


      await comments.create(latestComment.dataValues);

      return StatusResponse.success(res, {
        comment: updatedComment[1],
        message: 'Comment Successfully updated',
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: 'Something went wrong'
      });
    }
  }

  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request Object
   * @param {Object} res - HTTP Response Object
   * @return {Object} Returned Object
   */
  static async getACommentHistory(req, res) {
    const { articleId, commentId } = req.params;
    try {
      const commentHistory = await comments.findAll({
        where: { articleId, commentId, isArchived: false },
        order: [['id', 'DESC']],
        include: [{
          model: articles,
          where: {
            isArchived: false
          },
          attributes: []
        }],
      });

      if (!commentHistory.length) {
        return StatusResponse.notfound(res, {
          message: 'No Edit History Found'
        });
      }
      return StatusResponse.success(res, {
        message: 'Success',
        commentHistory,
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: 'Something went wrong'
      });
    }
  }
}

export default CommentHistoriesController;
