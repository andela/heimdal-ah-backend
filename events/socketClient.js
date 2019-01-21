import io from 'socket.io-client';
import logger from '../config/logger';

const socketClient = (port) => {
  const socket = io(`http://localhost:${port}`);

  if (process.env.NODE_ENV !== 'production') {
    socket.on('connect', () => {
      logger.log('socket.io-client-connected');
    });
  }
};
export default socketClient;
