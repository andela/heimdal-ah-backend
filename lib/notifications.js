import Models from '../models';

const { notifications } = Models;
// find one notification
const findNotification = async (userId, senderId) => {
  const notification = await notifications.findOne({
    where: {
      userId,
      senderId
    }
  });
  return notification;
};
// delete one notification
const deleteNotifications = async (senderId, userId) => {
  await notifications.destroy({
    where: {
      senderId,
      userId
    }
  });
  return false;
};

// create a notification
const createNotification = async (info) => {
  const { userId, type, senderId } = info;
  try {
    const ifExist = await findNotification(userId, senderId);

    if (ifExist && type === 'like') {
      return deleteNotifications(senderId, userId);
    }
    //  if like does not exist create new like
    await notifications.create({
      userId,
      type,
      senderId
    });
    return true;
  } catch (error) {
    return error;
  }
};

export {
  createNotification,
  deleteNotifications,
  findNotification
};
