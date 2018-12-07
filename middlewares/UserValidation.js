/**
 * Signup validation class
 * classname should match file name and start with capital
 */
class UserValidation {
  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @param {object} next Move to the next middleware or function
   * @return {object} User validation response to user
   */
  static validateUserSignUp(req, res, next) {
    UserValidation.checkUserEmail(req);
    UserValidation.checkPassword(req);
    UserValidation.checkUserName(req);
    UserValidation.showError(req, res, next);
  }

  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @param {object} next Move to the next middleware or function
   * @return {object} User validation response to user
   */
  static validateUserLogin(req, res, next) {
    UserValidation.checkUserEmail(req);
    UserValidation.checkPassword(req);
    UserValidation.showError(req, res, next);
  }

  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} User validartion response to user
   */
  static checkUserEmail(req) {
    // req.checkBody('email', 'email cannot be undefined').custom(val => val !== undefined);
    req.checkBody('email', 'please enter an email').notEmpty();
    req.checkBody('email', 'please enter a valid email').isEmail();
  }

  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} User validation response to user
   */
  static checkPassword(req) {
    // req.checkBody('password', 'password cannot be undefined').custom(val => val !== undefined);
    req.checkBody('password', 'password cannot be empty').notEmpty();
    req.checkBody('password', 'password must be at least 8 characters').isLength({ min: 8 });
    req.checkBody('password', 'password must not contain space').matches(/^\S*$/);
    req
      .checkBody('password', 'password must contain a letter and number')
      .matches(/^((?=.*\d))(?=.*[a-zA-Z])/);
  }

  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} User validation response to user
   */
  static checkUserName(req) {
    // req.checkBody('username', 'username cannot be undefined').custom(val => val !== undefined);
    req.checkBody('username', 'please enter a Username, it cannot be empty').notEmpty();
    req
      .checkBody(
        'username',
        'please enter a valid username can contain a letter or mixture of both letter and number'
      )
      .isAlphanumeric();
    req
      .checkBody('username', 'please enter a valid username, cannot be more than 20 characters')
      .isLength({ max: 20 });
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
        return res.status(422).json({ errors: { ...err } });
      }
      return next();
    } catch (error) {
      throw error;
    }
  }
}

export default UserValidation;
