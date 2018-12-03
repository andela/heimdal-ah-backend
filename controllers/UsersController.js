import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models';
import passwordReset from '../helpers/ResetPassword';

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

    const user = await Users
      .findOne({
        where: {
          email: req.body.email
        }
      });
    if (!user) {
      return res.send('user not avalaible');
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400
      }
    );
    const data = await passwordReset.passwordMail(req.body.email, token);

    if (data !== 'success') {
      return res.status(400).send('message was not sent');
    }
    return res.status(200).send('message was sent successfully');
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
        res.status(200).send('updated');
      } catch (error) {
        res.status(400).send(error);
      }
    } catch (error) {
      res.status(400).send(error);
    }
    return null;
  }
}
export default UsersController;
