import bcrypt from 'bcryptjs';
import usersModel from '../models';
import StatusResponse from '../helpers/StatusResponse';
import UserModelQuery from '../lib/user';
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
    const roleName = 'user';

    const emailToken = helper.generateEmailToken(email);

    const link = `http://${req.headers.host}/api/v1/users/verify-email/${emailToken}`;

    const emailSubject = 'Verify your email on Authors Haven';

    const emailBody = `
      <div>
        <h2 style="color: blue">Hello ${username}, Thanks for signing up on heimdal</h2>
        Please click here to verify your email address, this link expires in two days.
        <a href="${link}">${link}</a>
      </div>
    `;

    const emailContent = { emailSubject, emailBody };

    mailer.sendCustomMail(email, emailContent);

    try {
      const user = await UserModelQuery.getUserByEmail(email);

      if (user) {
        const payload = {
          message: 'This email has been taken'
        };
        return StatusResponse.conflict(res, payload);
      }
      const emailVerification = 'false';
      const roleData = await roles.create({
        name: roleName,
      });

      const userData = await users.create({
        email,
        username,
        emailVerification,
        password: hashPassword,
        roleId: roleData.id
      });
      const userId = userData.id;
      const token = getToken(userId, username);
      // delete userData.dataValues.password;
      const payload = {
        message: 'user created succesfully',
        userData,
        token,
        emailToken
      };
      return StatusResponse.created(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res);
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
        return StatusResponse.conflict(res, payload);
      }
      if (!bcrypt.compareSync(password, user.dataValues.password)) {
        // user.dataValues.password = undefined;
        const payload = {
          message: 'you have entered invalid credentials',
          token: 'null'
        };
        return StatusResponse.badRequest(res, payload);
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
      return StatusResponse.internalServerError(res);
    }
  }
}

export default AuthController;
