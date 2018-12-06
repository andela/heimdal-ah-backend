import jwt from 'jsonwebtoken';

import models from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { users } = models;

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
      return StatusResponse.badRequest(res, {
        message: 'The verification link is invalid. Check your email and try again'
      });
    }

    const { email } = decodedToken;

    try {
      const user = await users.findOne({
        where: { email }
      });

      if (!user) {
        return StatusResponse.notfound(res, {
          message: 'No user found'
        });
      }

      const updateUser = await users.update(
        {
          emailVerification: true
        },
        { where: { email } }
      );
      if (!updateUser) {
        return StatusResponse.badRequest(res, {
          message: 'Unable to verify your password try again'
        });
      }

      return StatusResponse.success(res, {
        message: 'Your email has been verified'
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: 'users profile not returned succesfully, please try again',
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }
}

export default UsersController;
