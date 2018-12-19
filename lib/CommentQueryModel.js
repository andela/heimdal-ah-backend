import { Op } from 'sequelize';
import models from '../models';

const { comments, profiles } = models;
/**
 *
 *
 * @class ArticleQueryModel
 */
class CommentQueryModel {
  /**
    * @param {object} commentInfo  must be an object
   * @return {object} return an comment if it exist or null if it doesn't.
   */
  static async getPrivateComment(commentInfo) {
    const { articleId, userId } = commentInfo;
    try {
      const comment = await comments.findAll({
        include: [
          profiles,
        ],
        where: {
          [Op.or]: [{ articleId }, { userId }]
        }
        // where: {
        //   articleId,
        //   isArchived: false,
        //   commentId: null,
        // }
      });
      if (comment.length === 0) {
        return null;
      }
      return comment;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
    * @param {integer} articleId  must be type integer
   * @return {object} return an comment if it exist or null if it doesn't.
   */
  static async getPublicComment(articleId) {
    try {
      const comment = await comments.findAll({
        include: [
          profiles,
        ],
        where: {
          articleId,
          isArchived: false,
          commentId: null,
          isPrivate: false,
        }
      });
      if (comment.length === 0) {
        return null;
      }
      return comment;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
    * @param {object} commentInfo  must be an object containing
   * @return {object} return an comment if it exist or null if it doesn't.
   */
  static async getComment(commentInfo) {
    const { articleId, userId } = commentInfo;
    try {
      const comment = await comments.findAll({
        include: [
          profiles,
        ],
        where: {
          [Op.or]: [{ articleId }, { userId }],
          isArchived: false,
          commentId: null,
          articleId
        }
        // where: {
        //   articleId,
        //   isArchived: false,
        //   commentId: null,
        // }
      });
      if (comment.length === 0) {
        return null;
      }
      return comment;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }
}
export default CommentQueryModel;
