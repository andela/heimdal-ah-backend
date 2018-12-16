import models from '../models';
import { checkIdentifier } from '../helpers/articleHelper';
import StatusResponse from '../helpers/StatusResponse';

const { articles } = models;
const checkArticle = async (req, res, next) => {
  const whereClause = checkIdentifier(req.params.identifier);
  const get = await articles.findOne({
    where: {
      ...whereClause
    },
  });
  if (!get) {
    return StatusResponse.notfound(res, {
      message: 'Could not find article'
    });
  }
  return next();
};


const findArticleById = async (req, res, next) => {
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

export { checkArticle, findArticleById };
