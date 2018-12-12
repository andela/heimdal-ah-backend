import StatusResponse from '../helpers/StatusResponse';

const articlesMiddleware = {
  countTags(req, res, next) {
    const { tags } = req.body.tags;

    if (tags.length > 5) {
      const payload = { message: 'You can only add a maximum of 5 tags' };
      return StatusResponse.badRequest(res, payload);
    }
    return next();
  }
};

export default articlesMiddleware;
