import models from '../models';

const { users } = models;
/**
 *
 *
 * @class UserLibFile
 */
class UserModelQuery {
  /**
    * @param {stirng} email email must be type string
   * @return {object} return email if it exist or null if it doesn't.
   */
  static async getUserByEmail(email) {
    try {
      const emailUser = await users.findOne({ where: { email } });
      if (emailUser) {
        return emailUser;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
   *
   *
   * @static
   * @param {*} id the user id decoded from the token
   * @returns {object} return a user if it exist
   * @memberof UserModelQuery
   */
  static async getUserById(id) {
    try {
      const userId = await users.findOne({ where: { id } });
      if (userId) {
        return userId;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }
}
export default UserModelQuery;
