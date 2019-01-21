import { createNotification } from '../lib/notifications';
import eventype from '../events/eventTypes';
import mailer from './mailer';

const notify = async (notifyData, io) => {
  try {
    const {
      info,
      username,
      email,
    } = notifyData;

    const created = await createNotification(info);
    if (created) {
      await mailer.sendNotificationMail(email, username, info);
      io.emit(eventype.NOTIFICATION_CREATED, info);
      return true;
    }

    return false;
  } catch (error) {
    return error;
  }
};

export default notify;
