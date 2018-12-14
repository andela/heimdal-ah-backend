import StatusResponse from '../helpers/StatusResponse';
import models from '../models';
import checkIdentifier from '../helpers/checkIdentifier';

const { articles } = models;

const checkArticle = async (req, res, next) => {
  try {
    const identifier = req.params.id || req.params.articleId || req.params.identifier;
    const whereFilter = checkIdentifier(identifier);
    const fetchedArticle = await articles.findOne({
      where: {
        ...whereFilter,
        isArchived: false
      }
    });
    if (!fetchedArticle) {
      return StatusResponse.notfound(res, {
        message: 'Could not find article'
      });
    }
    req.app.locals.article = fetchedArticle;
    return next();
  } catch (error) {
    return StatusResponse.internalServerError(res, {
      message: `something went wrong, please try again.... ${error}`
    });
  }
};

export default checkArticle;