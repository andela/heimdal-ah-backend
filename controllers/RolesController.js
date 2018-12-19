import models from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { users, profiles, roles } = models;

/**
 * @description RolesController class
 */
class RolesController {
  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request Object
   * @param {Object} res - HTTP Response Object
   * @return {Object} Returned object
   */
  static async getUsers(req, res) {
    try {
      const allUsers = await users.findAll({
        include: [{
          model: roles,
          attributes: ['id', 'name']
        }, {
          model: profiles
        }],
        attributes: ['id']
      });

      return StatusResponse.success(res, {
        message: 'success',
        users: allUsers
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: 'Something went wrong'
      });
    }
  }

  /**
   * @description Update a user role
   * @param {Object} req - HTTP Request Object
   * @param {Object} res - HTTP Response Object
   * @return {Object} Returned object
   */
  static async update(req, res) {
    const { userId } = req.params;
    const { role } = req.body;

    const { id: roleId } = await roles.findOne({
      where: { name: role }
    });

    try {
      const updatedUser = await users.update({
        roleId
      }, {
        where: {
          id: userId,
        },
        returning: true
      });
      return StatusResponse.success(res, {
        message: 'success',
        user: updatedUser
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: 'Something went wrong'
      });
    }
  }

  /**
   * @description Fetch a single user
   * @param {Object} req - HTTP Request Object
   * @param {Object} res - HTTP Response Object
   * @return {Object} Returned object
   */
  static async getAUser(req, res) {
    const { userId } = req.params;
    try {
      const user = await users.findById(userId, {
        include: [{
          model: roles,
          attributes: ['id', 'name']
        }, {
          model: profiles
        }],
        attributes: ['id']
      });

      if (!user) {
        return StatusResponse.notfound(res, {
          message: 'User not found'
        });
      }
      return StatusResponse.success(res, {
        message: 'success',
        user,
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: 'Something went wrong'
      });
    }
  }
}

export default RolesController;
