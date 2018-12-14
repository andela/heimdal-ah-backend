import StatusResponse from '../helpers/StatusResponse';
import models from '../models';
import checkIdentifier from '../helpers/checkIdentifier';

const { articles } = models;

const articleExist = async (req, res, next) => {
  const paramsSlug = checkIdentifier(req.params.id);
  try {
    const fetchArticle = await articles.findOne({
      where: {
        ...paramsSlug
      }
    });
    if (!fetchArticle) {
      return StatusResponse.notfound(res, {
        message: 'Could not find article'
      });
    }
    return next();
  } catch (error) {
    return StatusResponse.internalServerError(res, {
      message: `something went wrong, please try again.... ${error}`
    });
  }
};

export default articleExist;
