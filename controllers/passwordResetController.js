import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models';
import Response from '../helpers/statusResponse';
import mailer from '../helpers/mailer';

/** @description usersController class
 * @return {object} the response object
 * @public
 */
class UsersController {
  /** @description it sends a mail to a user that forgot his password
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async forgotPassword(req, res) {
    const { Users } = UserModel;

    const user = await Users.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      return res.notfound(res, { message: 'user not avalaible' });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.tokenSecret,
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
  }

  /** @description updates the existing password in the database
   * @param {object} req is the request parameter
   * @param {object} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async resetPassword(req, res) {
    const { Users } = UserModel;
    const { id } = req.decoded;
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    try {
      const user = await Users.findOne({
        where: { id }
      });
      if (!user) {
        return res.status(404).send({ message: 'user not avalaible' });
      }
      try {
        const updatedPassword = await user.update({
          password: hashedPassword
        });
        if (updatedPassword) {
          return Response.success(res, {
            message: 'password update was succesful'
          });
        }
      } catch (error) {
        return Response.badRequest(res, {
          message: 'password was not updated'
        });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
    return null;
  }
}
export default UsersController;
