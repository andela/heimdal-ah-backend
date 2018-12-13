import models from '../models';
import StatusResponse from '../helpers/StatusResponse';
import articleHelper from '../helpers/articleHelper';
// import articlesMiddleware from '../middlewares/articlesMiddleware';

const { articles: Article, tags: Tag } = models;

/**
 * @description UsersController class
 */
class ArticlesController {
  /**
   * @description Create an article
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async create(req, res) {
    const { body, tags } = req.body;

    const readingTime = articleHelper.calcReadingTime(body);
    req.body.readingTime = readingTime;

    try {
      const article = await Article.create(req.body);
      if (!article) {
        const payload = { message: 'Could not create article' };
        return StatusResponse.notfound(res, payload);
      }
      if (tags) {
        await articleHelper.addArticleTags(tags, article);
      }

      const createdArticle = await Article.findOne({
        where: { id: article.id },
        include: {
          model: Tag,
          as: 'tags',
          required: true,
          attributes: ['tagName'],
          through: {
            attributes: []
          }
        }
      });

      if (!createdArticle) {
        const payload = { message: 'article not found' };
        return StatusResponse.notfound(res, payload);
      }
      const payload = { article: createdArticle };
      return StatusResponse.success(res, payload);
    } catch (error) {
      const payload = { message: 'An error occured, try again' };
      return StatusResponse.internalServerError(res, payload);
    }
  }
}

export default ArticlesController;
