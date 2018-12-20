import { Op } from 'sequelize';
import db from '../models';
import StatusResponse from '../helpers/StatusResponse';
import eventEmitter from '../helpers/eventEmitter';
import ArticleQueryModel from '../lib/ArticleQueryModel';
import eventTypes from '../events/eventTypes';

const { comments, profiles } = db;
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
    const { articleId } = req.params;
    const { userId } = req.app.locals.user;
    try {
      const comment = await comments.create({
        userId,
        articleId,
        content
      });
      // event emitter
      const articleOwner = await ArticleQueryModel.getArticleByIdentifier({ id: articleId });

      eventEmitter.emit(eventTypes.COMMENT_NOTIFICATION_EVENT, {
        to: articleOwner.dataValues,
        from: userId,
        articleId: req.params.articleId,
        type: 'comment',
        event: comment.dataValues
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
    const { articleId } = req.params;
    try {
      const comment = await comments.findAll({
        include: [
          profiles,
        ],
        where: {
          articleId,
          isArchived: false,
          commentId: null
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
      await comments.update({
        isArchived: true,
      }, {
        where: {
          [Op.or]: [{ id: commentId }, { commentId }]
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
