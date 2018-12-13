import models from '../models';
import { checkIdentifier } from '../helpers/articleHelper';
import StatusResponse from '../helpers/StatusResponse';

const { articles } = models;
const checkArticle = async (req, res, next) => {
  const paramsSlug = checkIdentifier(req.params.identifier);
  const article = await articles.findOne({
    where: {
      ...paramsSlug
    },
  });
  if (!article) {
    return StatusResponse.notfound(res, {
      message: 'Could not find article'
    });
  }
  return next();
};
export default checkArticle;
