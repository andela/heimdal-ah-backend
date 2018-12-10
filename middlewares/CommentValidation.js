import Response from '../helpers/StatusResponse';
/**
 * Validate all comment fields
 *classname should match file name and start with capital
 * @class CommentValidation
 */
class CommentValidation {
  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @param {object} next Move to the next middleware or function
   * @return {object} Comment validation response to user
   */
  static async validateAllParams(req, res, next) {
    req.checkBody('articleId', 'Please enter an Article Id').notEmpty();
    req.checkBody('articleId', 'Article Id Must be an Integer').isInt();

    req.checkBody('userId', 'User Id cannot be empty').notEmpty();
    req.checkBody('userId', 'User Id must be an Integer').isInt();

    req.checkBody('content', 'Content cannot be empty').notEmpty();
    req.checkBody('content', 'Content cannot be more than 200 characters').isLength({ max: 100 });
    try {
      const errors = await req.validationErrors();
      const err = [];
      if (errors) {
        errors.forEach(({ param, msg }) => {
          if (err[param] === undefined) {
            err[param] = {
              msg
            };
          }
        });
        return Response.badRequest(res, { errors: { ...err } });
      }
      return next();
    } catch (error) {
      const payload = {
        message: 'Something went wrong', error
      };
      return Response.internalServerError(res, payload);
    }
  }
}
export default CommentValidation;
