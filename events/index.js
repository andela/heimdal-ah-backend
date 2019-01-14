import socketIo from './socketIo';
import handlers from './handlers';
import socketClient from './socketClient';


const events = {
  start(server, port) {
    socketClient(port);
    socketIo.connect(server, handlers);
  },
};


export default events;
