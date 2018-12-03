import User from '../models/users';
import Profile from '../models/profiles';

/**
* @description Users class
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
      const response = await User.findAll({
        where: {
          role: 'authors'
        },
        include: [{
          model: Profile,
          as: 'profile',
        }]
      });
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default UsersController;
