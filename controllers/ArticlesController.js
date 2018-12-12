import models from '../models';
import StatusResponse from '../helpers/StatusResponse';
import articleHelper from '../helpers/articleHelper';
// import articlesMiddleware from '../middlewares/articlesMiddleware';

const { Article, Tag } = models;

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

    // articlesMiddleware.countTags(tags);

    // const wordCount = textBody => textBody.split(' ').length;
    const readingTime = articleHelper.calcReadingTime(body);

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
          });
          await article.addTags(tagList);
        });
      }

      const createdArticle = await Article.findOne({
        where: { id: article.id },
        include: { model: Tag, as: 'tags' }
      });

      if (!createdArticle) {
        const payload = { message: 'article not found' };
        return StatusResponse.notfound(res, payload);
      }
      const payload = { article: createdArticle, tagList: tags };
      return StatusResponse.success(res, payload);
      // return res.json({ article: createdArticle, tagList: tags });
    } catch (error) {
      const payload = { message: 'An error occured, try again' };
      return StatusResponse.internalServerError(res, payload);
      // return res.json(error);
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
