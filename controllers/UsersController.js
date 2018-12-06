import status from '../helpers/StatusResponse';
import models from '../models';


const { users, profiles, roles } = models;

/**
* @description UsersController class
*/
class UsersController {
  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async list(req, res) {
    try {
      const authorsList = await users.findAll({
        include: [profiles, {
          model: roles,
          as: 'roles',
          where: {
            role: 'user'
          }
        }],
        attributes: { exclude: ['password'] }
      });
      if (authorsList) {
        status.success(res, {
          message: 'List of authors',
          authors: authorsList
        });
      }
    } catch (error) {
      status.internalServerError(res, {
        message: 'Something went wrong.. Try again!'
      });
    }
  }
}

export default UsersController;
