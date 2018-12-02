import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import nodeLogger from 'logger';
import usersModel from '../models';
import statusResponse from '../helpers/statusResponse';

const logger = nodeLogger.createLogger();

/**
 * Login Controller
 */

/**
  *
  */
class LoginController {
  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} signUpCtrl response to user
   */
  static loginCtrl(req, res) {

  }
}
export default LoginController;
