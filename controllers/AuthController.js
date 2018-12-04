import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import usersModel from '../models';
import statusResponse from '../helpers/statusResponse';
import UserModelQuery from '../lib/user';

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
    const { Users, Roles } = usersModel;

    // hash password here
    const genSalt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, genSalt);
    const role = 'user';

    const emailToken = helper.generateEmailToken(email);

    // generate the email verification link
    const link = `http://${req.headers.host}/api/v1/users/verify-email/${emailToken}`;

    // Construct the email content here {emailSubject and emailBody}
    const emailSubject = 'Verify your email on Authors Haven';

    const emailBody = `
      <div>
        <h2 style="color: blue">Hello ${username}, Thanks for signing up on heimdal</h2>
        Please click here to verify your email address, this link expires in two days.
        <a href="${link}">${link}</a>
      </div>
    `;

    const emailContent = { emailSubject, emailBody };

    // Send Verification mail as custom mail
    mailer.sendCustomMail(email, emailContent);

    try {
      const user = await UserModelQuery.getUserByEmail(email);

      if (user) {
        const payload = {
          message: 'This email has been taken'
        };
        return statusResponse.conflict(res, payload);
      }
      try {
        const emailVerification = 'false';
        const userData = await Users.create({
          email,
          username,
          emailVerification,
          password: hashPassword
        });

        await Roles.create({
          role,
          userId: userData.id
        });

        const token = jwt.sign({ email, username }, process.env.tokenSecret, {
          expiresIn: 86400
        });
        req.app.set('token', token);
        userData.dataValues.password = undefined;

        const payload = {
          message: 'user created succesfully',
          userData,
          token,
          emailToken
        };

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
