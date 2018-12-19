import models from '../models';
import { checkIdentifier } from '../helpers/articleHelper';
import StatusResponse from '../helpers/StatusResponse';

const { articles } = models;
const checkArticle = async (req, res, next) => {
  try {
    const identifier = req.params.id || req.params.articleId || req.params.identifier
      || req.params.articleId;
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

const { tags } = models;

const getTagId = async (req, res, next) => {
  const tag = await tags.findAndCountAll({
    where: {
      tagName: req.query.tag
    },
  });
  if (tag.count < 1) {
    return StatusResponse.notfound(res, {
      message: 'No Articles with such tags',
    });
  }
  req.tagId = tag.rows[0].id;
  req.app.locals.tag = {
    tagId: req.tagId,
  };
  return next();
};

export { checkArticle, checkTags, getTagId };
