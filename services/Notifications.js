import UsermodelQuery from '../lib/UserModelQuery';
import mailer from '../helpers/mailer';
import { createNotification } from '../lib/notifications';
/** @description Notifications class
 * @public
 */
class Notifications {
  /** @description function to like an article
   * @param {object} payload is the response parameter
   * @return {object} the response object
   * @public
   */
  static async addNotification(payload) {
    try {
      const { to: { userId, title, slug }, type, from: user } = payload;
      const articleOwner = await UsermodelQuery.getUserById(userId);
      const sender = await UsermodelQuery.getUserById(user);
      const { dataValues: { email } } = articleOwner;
      const { profile: { dataValues: { username } } } = sender;
      const info = {
        title,
        type,
        link: slug,
        userId,
        senderId: user
      };
      const creation = await createNotification(info);
      if (creation === true) {
        await mailer.sendNotificationMail(email, username, info);
      }
      return null;
    } catch (error) {
      return error;
    }
  }
}
export default Notifications;
