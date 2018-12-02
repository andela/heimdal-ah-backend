import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import nodeLogger from 'logger';
import usersModel from '../models';
import statusResponse from '../helpers/statusResponse';

const logger = nodeLogger.createLogger();


/**
 * Signup validation class
 * classname should match file name and start with capital
 */
class SignupController {
  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} signUpCtrl response to user
   */
  static async signUpCtrl(req, res) {
    const { email, password, username } = req.body;
    const { Users } = usersModel;
    let token;
    // validation check here
    const genSalt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, genSalt);
    // const role = 'user';

    const data = await Users.find({
      where: { email }
    });
    if (data) {
      const message = 'user already exists';
      return statusResponse.sendResponse40x(res, 400, message, false);
      // buisness logic should be in a file.
    }
    const emailverification = 'false';
    try {
      const todo = await Users.create({
        email,
        password: hashPassword,
        username,
        // role,
        emailverification
      });

      // .then((todo) => {
      token = jwt.sign({ email, username }, process.env.tokenSecret, {
        expiresIn: 86400,
      });
      const message = 'user created succesfully';
      return statusResponse.sendResponse20x(res, 201, false, message, todo, token);
    } catch (error) {
      logger.error('==>', error);
    }

    return null;
  }
}

export default SignupController;
