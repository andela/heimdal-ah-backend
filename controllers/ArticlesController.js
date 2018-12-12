import models from '../models';
// import StatusResponse from '../helpers/StatusResponse';
import articleHelper from '../helpers/articleHelper';

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
    const { body, tags } = req.body;

    // const wordCount = textBody => textBody.split(' ').length;
    const readingTime = articleHelper.calcReadingTime(body);

    console.log('R::', readingTime);

    req.body.readingTime = readingTime;

    try {
      const article = await Article.create(req.body);
      if (!article) {
        return res.json({ message: 'Could not create article' });
      }
      if (tags) {
        tags.map(async (thisTag) => {
          const [tagList] = await Tag.findOrCreate({
            where: { tagName: thisTag }
            // defaults: { tagName: thisTag }
          });
          await article.addTags(tagList);
        });
      }

      const createdArticle = await Article.findOne({
        where: { id: article.id },
        include: { model: Tag, as: 'tags' }
      });

      if (!createdArticle) {
        return res.json({ message: 'Not found' });
      }
      return res.json({ article: createdArticle, tagList: tags });
    } catch (error) {
      return res.json(error);
    }

    /*
    const createTags = tags.map(thisTag => Tag.findOrCreate({
      where: { tagName: thisTag },
      defaults: { tagName: thisTag }
    }).spread((thisTag, created) => thisTag));
    // return Article.create(req.body).then((articles) => {
    //   articles.setTags([33, 44]);
    // });

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
      */
  }
}

export default ArticlesController;
