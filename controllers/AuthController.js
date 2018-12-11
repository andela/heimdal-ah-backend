import bcrypt from 'bcryptjs';
import usersModel from '../models';
import StatusResponse from '../helpers/StatusResponse';
import UserModelQuery from '../lib/UserModelQuery';
import getToken from '../helpers/getToken';
import mailer from '../helpers/mailer';
import helper from '../helpers/helper';

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
    const { email, password, username } = req.body;
    const { users, roles } = usersModel;

    const genSalt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, genSalt);

    const emailToken = helper.generateEmailToken(email);

    const link = `http://${req.headers.host}/api/v1/users/verify-email/${emailToken}`;

    try {
      const user = await UserModelQuery.getUserByEmail(email);

      if (user) {
        const payload = {
          message: 'This email has been taken'
        };
        return StatusResponse.conflict(res, payload);
      }

      mailer.sendVerificationMail(email, username, link);

      const roleData = await roles.create(
        {
          users: {
            email,
            username,
            password: hashPassword
          }
        },
        { include: [{ model: users, as: 'users' }] }
      );

      const newUser = roleData.users[0];
      newUser.password = undefined;
      const token = getToken(newUser.id, username);
      const payload = {
        message: 'user created succesfully',
        user: newUser,
        token,
        emailToken
      };
      return StatusResponse.created(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }

  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} login response to user
   */
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModelQuery.getUserByEmail(email);
      if (!user) {
        const payload = {
          message: 'email does not exist'
        };
        return StatusResponse.notfound(res, payload);
      }
      if (!bcrypt.compareSync(password, user.dataValues.password)) {
        const payload = {
          message: 'you have entered invalid credentials'
        };
        return StatusResponse.notfound(res, payload);
      }
      const { username, id } = user;
      const token = getToken(id, username);
      user.dataValues.password = undefined;
      const payload = {
        message: 'user logged in succesfully',
        user,
        token
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      console.log(error);
      return StatusResponse.internalServerError(res, {
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }
}

export default AuthController;
