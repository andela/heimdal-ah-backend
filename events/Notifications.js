import UsermodelQuery from '../lib/UserModelQuery';
import notify from '../helpers/events';


/** @description Notifications class
 * @public
 */
class Notifications {
  /** @description function to add a notification
   * @param {object} payload is the response parameter
   * @param {object} io is the response parameter
   * @return {object} the response object
   * @public
   */
  static async addNotification(payload, io) {
    try {
      const {
        to: { userId, title, slug }, type, from: user, data
      } = payload;

      const recipient = await UsermodelQuery.getUserById(userId);
      const sender = await UsermodelQuery.getUserById(user);
      const { dataValues: { email } } = recipient;
      const { profile: { dataValues: { username } } } = sender;

      const info = {
        title,
        type,
        link: slug,
        userId,
        senderUsername: username,
        senderId: user,
        data
      };
      const notifyData = {
        recipient,
        info,
        username,
        email
      };
      return await notify(notifyData, io);
    } catch (error) {
      return error;
    }
  }

  /** @description function to add a follow notification
   * @param {object} payload is the response parameter
   * @param {object} io is the response parameter
   * @return {object} the response object
   * @public
   */
  static async followNotification(payload, io) {
    try {
      const {
        to: recipient,
        type,
        data,
        from: userId
      } = payload;

      const followed = await UsermodelQuery.getUserById(recipient);
      const follower = await UsermodelQuery.getUserById(userId);
      const { dataValues: { email } } = followed;
      const { profile: { dataValues: { username } } } = follower;
      const info = {
        title: 'followed',
        type,
        userId,
        senderId: recipient,
        link: '',
        data
      };
      const notifyData = {
        recipient: followed,
        info,
        username,
        email
      };
      return await notify(notifyData, io);
    } catch (error) {
      return error;
    }
  }

  /** @description function to add a follow notification
   * @param {object} payload is the response parameter
   * @param {object} io is the response parameter
   * @return {object} the response object
   * @public
   */
  static async articleNotification(payload, io) {
    try {
      const {
        to: recipient, data, type, link, from: userId
      } = payload;
      const follower = await UsermodelQuery.getUserById(recipient);
      const author = await UsermodelQuery.getUserById(userId);
      const { dataValues: { email } } = follower;
      const { profile: { dataValues: { username } } } = author;
      const info = {
        type,
        userId,
        recipient,
        data,
        link
      };

      const notifyData = {
        recipient: follower,
        info,
        username,
        email
      };
      return await notify(notifyData, io);
    } catch (error) {
      return error;
    }
  }
}
export default Notifications;
