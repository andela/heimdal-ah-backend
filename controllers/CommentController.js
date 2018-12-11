import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';
import StatusResponse from '../helpers/StatusResponse';
import ArticleQueryModel from '../lib/ArticleQueryModel';

dotenv.config();

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
  static async createComment(req, res) {
    const { content } = req.body;
    const { slug } = req.params;
    try {
      const checkArticle = await ArticleQueryModel.getArticleBySlug(slug);
      if (checkArticle) {
        const token = req.body.token || req.query.token || req.headers['access-token'];
        const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const { userId } = verifiedToken;
        const comment = await comments.create({
          userId,
          articleSlug: slug,
          content
        });
        if (comment) {
          const payload = {
            message: 'Comment has been successfully created',
            comment
          };
          StatusResponse.created(res, payload);
        }
      }
      const payload = {
        message: 'Article does not Exist in the database'
      };
      StatusResponse.notfound(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully create a Comment',
        error: {
          body: [`Internal server error => ${error}`]
        }
      };
      StatusResponse.internalServerError(res, payload);
    }
  }

  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async listAllComment(req, res) {
    const { slug } = req.params;
    try {
      const checkArticle = await ArticleQueryModel.getArticleBySlug(slug);
      if (checkArticle) {
        const comment = await comments.findAll({
          include: [
            users,
          ],
          where: {
            articleSlug: slug
          }
        });
        if (comment.length === 0) {
          const payload = {
            message: 'No Comment exist'
          };
          StatusResponse.notfound(res, payload);
        }
        const payload = {
          message: 'All Comment for the Article',
          comment
        };
        StatusResponse.success(res, payload);
      }
      const payload = {
        message: 'Article does not Exist in the database'
      };
      StatusResponse.notfound(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully list out Comments',
        error: {
          body: [`Internal server error => ${error}`]
        }
      };
      StatusResponse.internalServerError(res, payload);
    }
  }

  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async deleteAComment(req, res) {
    const { id } = req.params;

    try {
      const checkComment = await ArticleQueryModel.getCommentById(id);
      if (checkComment) {
        await comments.destroy({
          where: {
            id
          }
        });
        const payload = {
          message: 'Successfully deleted'
        };
        StatusResponse.success(res, payload);
      }
      const payload = {
        message: 'No Comment exist'
      };
      StatusResponse.notfound(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully delete a Comment',
        error: {
          body: [`Internal server error => ${error}`]
        }
      };
      StatusResponse.internalServerError(res, payload);
    }
  }
}

export default CommentController;
