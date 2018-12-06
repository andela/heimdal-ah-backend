import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models';
import Response from '../helpers/StatusResponse';
import mailer from '../helpers/mailer';

import logger from '../config/logger';

/** @description usersController class
 * @return {object} the response object
 * @public
 */
class PasswordResetController {
  /** @description it sends a mail to a user that forgot his password
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async forgotPassword(req, res) {
    const { users } = UserModel;
    try {
      const user = await users.findOne({
        where: {
          email: req.body.email
        }
      });
      if (!user) {
        return Response.notfound(res, { message: 'user not avalaible' });
      }
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: 86400
        }
      );

      const emailSubject = 'Please rerset your password';
      const emailBody = `
      <div>
          <h1> please follow this link to update your password</h1>
          ${token}
      </div>`;
      const emailContent = { emailSubject, emailBody };
      const data = await mailer.sendCustomMail(req.body.email, emailContent);
      if (data) {
        return Response.badRequest(res, { message: 'message was not sent' });
      }
      return Response.success(res, { message: 'Email was sent successfully' });
    } catch (err) {
      return Response.internalServerError(res, { message: 'Server error' });
    }
  }

  /** @description updates the existing password in the database
   * @param {object} req is the request parameter
   * @param {object} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async resetPassword(req, res) {
    const { users } = UserModel;
    const { id } = req.decoded;
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    try {
      const user = await users.findOne({
        where: { id }
      });
      if (!user) {
        return Response.notfound(res, { message: 'user not avalaible' });
      }
      const updatedPassword = await users.update({
        password: hashedPassword
      });
      if (updatedPassword) {
        return Response.success(res, {
          message: 'password update was succesful'
        });
      }

      return Response.internalServerError(res, {
        message: 'password was not updated'
      });
    } catch (error) {
      return Response.internalServerError(res, {
        message: 'Server Error'
      });
    }
  }
}
export default PasswordResetController;
