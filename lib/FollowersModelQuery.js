import models from '../models';
// import profiles from '../models/profiles';

const { followers, profiles, users } = models;
/**
 *
 *
 * @class UserLibFile
 */
class FollowersModelQuery {
  /**
    * @param {stirng} followedId username of the person you are following
   * @return {object} return .
   */
  static async findFollowingByUsername(followedId) {
    try {
      const userRecord = await followers.findOne({ where: { followedId } });
      if (userRecord) {
        return userRecord;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
    * @param {stirng} followedId username must be type string
    * @param {stirng} followerId  user id must be type integer
   * @return {object} return an object
   */
  static async findFollowingById(followedId, followerId) {
    try {
      const userRecord = await followers.findOne({ where: { followedId, followerId } });
      if (userRecord) {
        return userRecord;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
    * @param {stirng} followerId  user id must be type integer
   * @return {object} return an object
   */
  static async findAllFollowers(followerId) {
    try {
      const userRecord = await followers.findAll({
        include: [{
          model: profiles
        }],
        where: { followerId },
      });
      if (userRecord) {
        return userRecord;
      }
      return null;
    } catch (e) {
      // console.log(e);
      throw new Error('Something went wrong', e);
    }
  }

  /**
    * @param {stirng} followedId  user id must be type integer
   * @return {object} return an object
   */
  static async findAllFollowing(followedId) {
    try {
      const userRecord = await followers.findAll({
        include: [{
          model: profiles,
        }],
        where: { followedId }
      });
      if (userRecord) {
        return userRecord;
      }
      return null;
    } catch (e) {
      // console.log(e);
      throw new Error('Something went wrong', e);
    }
  }

  /**
    * @param {stirng} userId  user id must be type integer
   * @return {object} return an object
   */
  static async findAllFollowingbByNotifications(userId) {
    try {
      const userRecord = await followers.findAll({
        attributes: ['followerId', 'followedId'],
        where: { followedId: userId },
        include: [{
          model: profiles,
          attributes: ['username', 'userId'],
          required: true,
          include: [{
            model: users,
            where: { notification: true },
            required: true,
            attributes: ['email', 'notification', 'id'],
          }]
        }],
      });
      if (userRecord) {
        return userRecord;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e.message);
    }
  }
}
export default FollowersModelQuery;
