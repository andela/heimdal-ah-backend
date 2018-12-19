import eventEmitter from '../helpers/MyEmitter';
import Notifications from './Notifications';

const services = () => {
  eventEmitter.on('articleNotification', Notifications.addNotification);
  eventEmitter.on('commentNotification', Notifications.addNotification);
  eventEmitter.on('ratingsNotification', Notifications.addNotification);
};

export default services;
