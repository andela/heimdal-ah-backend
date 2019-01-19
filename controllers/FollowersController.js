import model from '../models';
import StatusResponse from '../helpers/StatusResponse';
import ProfilesModelQuery from '../lib/ProfilesModelQuery';
import FollowersModelQuery from '../lib/FollowersModelQuery';
import { followEvent } from '../lib/events';


const { followers } = model;

/**
 * @description - This class is all about users
 * @param {object} req
 * @param {object} res
 * @returns {class} Users
 */
class FollowersController {
  /**
 * @param {object} req
 * @param {object} res
 * @returns {object} returns a signup object
 */
  static async followUsers(req, res) {
    try {
      const { followedId } = req.params;
      const intFollowId = parseInt(followedId, 10);
      const { userId } = req.app.locals.user;

      const verifyFollowerUsernameAndId = await FollowersModelQuery
        .findFollowingById(intFollowId, userId);
      if (verifyFollowerUsernameAndId) {
        return res.send({ message: 'you are already following this user' });
      }
      const verifyUsername = await ProfilesModelQuery.getUserById(intFollowId);
      // console.log(verifyUsername);
      if (!verifyUsername) {
        const payload = {
          message: 'Username does not exist'
        };
        return StatusResponse.notfound(res, payload);
      }
      // console.log('====> ', typeof (userId), typeof (followedId));
      if (intFollowId === userId) {
        const payload = {
          message: 'You cannot follow yourself',
        };
        return StatusResponse.notfound(res, payload);
      }

      const followUser = await followers.create({
        followerId: userId,
        followedId
      });

      if (followUser) {
        const info = { intFollowId, userId, followUser };
        followEvent(info);

        return StatusResponse.success(res, {
          message: 'User followed successfully',
        });
      }
      const payload = {
        message: 'Failed to follow user'
      };
      return StatusResponse.notfound(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }

  // all people wey i dey follow
  /**
 * @param {object} req
 * @param {object} res
 * @returns {object} returns a signup object
 */
  static async getAllFollowers(req, res) {
    try {
      const { userId } = res.app.locals.user;

      const allReturnedFollowers = await FollowersModelQuery
        .findAllFollowers(userId);
      if (allReturnedFollowers.length === 0) {
        const payload = {
          message: 'You currently do not have any followers'
        };
        return StatusResponse.notfound(res, payload);
      }
      const payload = {
        data: allReturnedFollowers
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }

  // find all people wey dey follow me based on my username
  /**
 * @param {object} req
 * @param {object} res
 * @returns {object} returns a signup object
 */
  static async getAllFollowing(req, res) {
    try {
      const { userId } = req.app.locals.user;

      const following = await FollowersModelQuery
        .findAllFollowing(userId);
      // console.log(following);
      if (following.length === 0) {
        const payload = {
          message: 'You  have no followers following you'
        };
        return StatusResponse.success(res, payload);
      }
      return res.status(200).send({
        data: following
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }

  // unfollow user
  /**
   * @description Responsible for unfollowing user
 * @param {object} req
 * @param {object} res
 * @returns {object} returns a signup object
 */
  static async unfollowUser(req, res) {
    try {
      const { followedId } = req.params;
      const { userId } = req.app.locals.user;

      const verifyFollowerUsernameAndId = await FollowersModelQuery
        .findFollowingById(followedId, userId);
      if (!verifyFollowerUsernameAndId) {
        return res.send({ message: 'you are not following this user' });
      }
      const verifyUsername = await ProfilesModelQuery.getUserById(followedId);
      if (!verifyUsername) {
        const payload = {
          message: 'Username does not exist'
        };
        return StatusResponse.notfound(res, payload);
      }
      if (followedId === userId) {
        const payload = {
          message: 'You cannot unfollow yourself',
        };
        return StatusResponse.notfound(res, payload);
      }
      const followUser = await followers.destroy({
        where: {
          followerId: userId,
          followedId,
        }
      });
      if (followUser) {
        return StatusResponse.success(res, {
          message: 'User unfollowed successfully',
        });
      }
      const payload = {
        message: 'Failed to unfollow user'
      };
      return StatusResponse.notfound(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }
}

export default FollowersController;
