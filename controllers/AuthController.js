import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import usersModel from '../models';
import statusResponse from '../helpers/statusResponse';

/**
 * Signup validation class
 * classname should match file name and start with capital
 */
class AuthController {
  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} signUpCtrl response to user
   */
  static async signUp(req, res) {
    // console.log('------->', req.body);
    const { email, password, username } = req.body;
    const { Users, Roles } = usersModel;

    // validation check here
    const genSalt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, genSalt);
    const role = 'user';

    try {
      const user = await Users.findOne({
        where: { email }
      });
      if (user) {
        const payload = {
          message: 'user already exists',
        };
        return statusResponse.conflict(res, payload);
      }
      try {
        const emailVerification = 'false';
        const userData = await Users.create({
          email,
          password: hashPassword,
          username,
          emailVerification
        });
        await Roles.create({
          role,
          userId: userData.id
        });
        // .then((todo) => {
        const token = jwt.sign({ email, username }, process.env.tokenSecret, {
          expiresIn: 86400
        });
        req.app.set('token', token);
        delete userData.dataValues.password;

        const payload = {
          message: 'user created succesfully',
          userData,
          token,
        };
        // console.log(req.app.get('token'));
        return statusResponse.success(res, payload);
      } catch (error) {
        return statusResponse.internalServerError(res);
      }
    } catch (error) {
      return statusResponse.internalServerError(res);
    }
  }
}

export default AuthController;
