import jwt from 'jsonwebtoken';

// import notificationSender from '../middlewares/notificationSender';
// import Helper from '../helpers/helper';
import models from '../models';

const { User } = models;

/**
 * @description - This class handles the users
 * */
class UsersController {
  /**
   * @description  Method to verify a users email
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object
   */
  static async verifyEmail(req, res) {
    const { emailToken } = req.params;
    const decodedToken = jwt.decode(emailToken);

    if (!decodedToken) {
      return res.status(400).send({
        success: false,
        msg: 'The verification link is invalid. Check your email and try again'
      });
    }

    const { email } = decodedToken;

    try {
      const user = await User.findOne({
        where: { email }
      });
      if (!user) {
        return res.status(404).send({
          success: false,
          msg: 'No user found'
        });
      }

      const updateUser = await User.update(
        {
          emailVerification: true
        },
        { where: { email } }
      );
      if (!updateUser) {
        return res.status(400).send({
          success: false,
          msg: 'Unable to update user'
        });
      }

      return res.status(200).send({
        success: true,
        msg: 'Your email has been verified'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An internal error occured, try again'
      });
    }
  }
}

export default UsersController;
