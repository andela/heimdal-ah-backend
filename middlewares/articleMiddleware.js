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


// const findArticleById = async (req, res, next) => {
//   try {
//     const fetchArticle = await articles.findOne({
//       where: {
//         id: req.params.id
//       }
//     });
//     if (!fetchArticle) {
//       return StatusResponse.notfound(res, {
//         message: 'Could not find article'
//       });
//     }
//     return fetchArticle;
//   } catch (error) {
//     StatusResponse.internalServerError(res, {
//       message: `something went wrong, please try again.... ${error}`
//     });
const checkTags = (req, res, next) => {
  const { tags } = req.body;
  if (tags) {
    if (!Array.isArray(tags)) {
      const payload = { message: 'Tags should be an array containing tag names' };
      return StatusResponse.badRequest(res, payload);
    }
    if (tags.length > 7) {
      const payload = { message: 'You can only add a maximum of 7 tags' };
      return StatusResponse.badRequest(res, payload);
    }

    const tagString = tags.map(eachTag => eachTag.toString());
    req.body.tags = tagString;
  }
  return next();
};

export { checkArticle, checkTags };
