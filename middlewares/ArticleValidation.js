import StatusResponse from '../helpers/StatusResponse';
/**
* @description ArticlesValidation class
*/
class ArticleValidation {
  /**
   * @description - validate article creation
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Returned object
   */
  static async validateInput(req, res, next) {
    req.checkBody('title', 'title cannot be empty').notEmpty();
    req.checkBody('description', 'description cannot be empty').notEmpty();
    req.checkBody('body', 'body cannot be empty').notEmpty();

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

export default ArticleValidation;
