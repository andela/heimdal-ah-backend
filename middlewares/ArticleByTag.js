import StatusResponse from '../helpers/StatusResponse';
import models from '../models';

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

export default getTagId;
