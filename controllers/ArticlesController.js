import models from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { Article, Tag } = models;

/**
 * @description UsersController class
 */
class ArticlesController {
  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async createArticle(req, res) {
    const { tags } = req.body;
    console.log(req.body);
    if (!tags) {
      return res.json({ message: 'Tag is required' });
    }
    const createTags = tags.map(thisTag => Tag.findOrCreate({
      where: { tagName: thisTag },
      defaults: { tagName: thisTag }
    }).spread((thisTag, created) => thisTag));

    return Article.create(req.body)
      .then(article => Promise.all(createTags)
        .then(storedTags => article.addTags(storedTags))
        .then(() => article))
      .then(article => Article.findOne({
        where: { id: article.id },
        include: { model: Tag, as: 'tags', attributes: ['tagName'] }
      }))
      .then(articleWithAssociation => res.json(articleWithAssociation))
      .catch(err => res.json({ err }));
  }
}

export default ArticlesController;
