import StatusResponse from '../helpers/StatusResponse';
/**
 * Validate all comment fields
 *classname should match file name and start with capital
 * @class CommentValidation
 */
class CommentValidation {
  /**
   * @param {object} req Takes comment request
   * @param {object} res Response to request
   * @param {object} next Move to the next middleware or function
   * @return {object} Comment validation response to user
   */
  static validateComment(req, res, next) {
    CommentValidation.checkCommentContent(req);
    CommentValidation.checkArticleSlug(req);
    CommentValidation.showError(req, res, next);
  }

  /**
   * @param {object} req Takes comment request
   * @param {object} res Response to request
   * @return {object} Comment validation response to user
   */
  static checkCommentContent(req) {
    req.checkBody('content', 'Please enter the comment content').notEmpty();
    req.checkBody('content', 'Content Length cannot be more than 200 characters').isLength({ min: 200 });
  }

  /**
   * @param {object} req Takes comment request
   * @param {object} res Response to request
   * @param {object} next Move to the next function
   * @return {object} User validation response to user
   */
  static checkCommentId(req, res, next) {
    req.checkParams('id', 'Please enter a comment Id').notEmpty();
    req.checkParams('id', 'Comment Id must be an Integer').isInt();
    const errors = req.validationErrors();
    const err = [];
    if (errors) {
      errors.forEach(({ param, msg }) => {
        if (err[param] === undefined) {
          err[param] = {
            msg
          };
        }
      });
      return StatusResponse.badRequest(res, { errors: { ...err } });
    }
    return next();
  }

  /**
   * @param {object} req Takes comment request
   * @param {object} res Response to request
   * @param {object} next Move to the next function
   * @return {object} User validation response to user
   */
  static checkArticleSlug(req) {
    req.checkParams('slug', 'Please enter an Article Slug').notEmpty();
  }

  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @param {object} next move to the next function or middleware
   * @return {object} User validation response to user
   */
  static async showError(req, res, next) {
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
        return StatusResponse.badRequest(res, { errors: { ...err } });
      }
      return next();
    } catch (error) {
      const payload = {
        message: 'Something went wrong', error
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }
}

export default CommentValidation;
