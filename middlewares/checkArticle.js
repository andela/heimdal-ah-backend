import StatusResponse from '../helpers/StatusResponse';
import models from '../models';
// import checkIdentifier from '../helpers/checkIdentifier';

const { articles } = models;

const checkArticle = async (req, res, next) => {
  // const whereClause = checkIdentifier(req.params.id);
  try {
    const fetchArticle = await articles.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!fetchArticle) {
      return StatusResponse.notfound(res, {
        message: 'Could not find article'
      });
    }
    return fetchArticle;
  } catch (error) {
    StatusResponse.internalServerError(res, {
      message: `something went wrong, please try again.... ${error}`
    });
  }
  return next();
};

export default checkArticle;
