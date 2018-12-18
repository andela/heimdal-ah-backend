import models from '../models';

const { comments, profiles } = models;
/**
 *
 *
 * @class ArticleQueryModel
 */
class CommentQueryModel {
  /**
    * @param {integer} articleId  must be type integer
   * @return {object} return an comment if it exist or null if it doesn't.
   */
  static async getPrivateComment(articleId) {
    try {
      const comment = await comments.findAll({
        include: [
          profiles,
        ],
        where: {
          articleId,
          isArchived: false,
          commentId: null,
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
}
export default CommentQueryModel;
