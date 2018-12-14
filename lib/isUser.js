import Models from '../models';

/** @description it sends a mail to a user that forgot his password
   * @param {number} userId is the request parameter
   * @return {object} the response object
   * @public
   */
const isUsers = async (userId) => {
  const { users } = Models;
  try {
    const user = await users.findOne({
      where: {
        id: userId
      }
    });
    if (user) {
      return 'success';
    }
    return 'failure';
  } catch (error) {
    return error;
  }
};


export default isUsers;
