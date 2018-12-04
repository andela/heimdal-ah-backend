// This function checks if the user email already exists
import models from '../models';

const { Users } = models;
/**
 *
 *
 * @class UserLibFile
 */
class UserModelQuery {
  // eslint-disable-next-line valid-jsdoc
  /**
   * @static This static function checks if an email exists in database.
   * @param {stirng} email email must be type string
   * @returns {object} return email if it exist or null if it doesn't.
   * @memberof UserLibFile
   */
  static async getUserByEmail(email) {
    try {
      const emailUser = await Users.findOne({ where: { email } });
      if (emailUser) {
        return emailUser;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }
}
export default UserModelQuery;
