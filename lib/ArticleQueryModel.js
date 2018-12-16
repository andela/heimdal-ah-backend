import models from '../models';

const { articles, comments } = models;
/**
 *
 *
 * @class ArticleQueryModel
 */
class ArticleQueryModel {
  /**
    * @param {stirng} slug  must be type string
   * @return {object} return an article if it exist or null if it doesn't.
   */
  static async getArticleBySlug(slug) {
    try {
      const article = await articles.findOne({ where: { slug } });
      if (article) {
        return article;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
    * @param {stirng} title  must be type string
   * @return {object} return an article if it exist or null if it doesn't.
   */
  static async getArticleByTitle(title) {
    try {
      const article = await articles.findOne({ where: { title } });
      if (article) {
        return article;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
    * @param {stirng} id  must be type integer
   * @return {object} return an article if it exist or null if it doesn't.
   */
  static async getCommentById(id) {
    try {
      const comment = await comments.findOne({ where: { id } });
      if (comment) {
        return comment;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
   * @return {object} return an article if it exist or null if it doesn't.
   */
  static async getArticleCount() {
    try {
      const articleCount = await articles.count({ where: { isArchived: false } });
      if (articleCount) {
        return articleCount;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
   * @return {object} return an article if it exist or null if it doesn't.
   */
  static async getAllArticles() {
    try {
      const articleCount = await articles.findAll({ where: { isArchived: false } });
      if (articleCount) {
        return articleCount;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }
}
export default ArticleQueryModel;
