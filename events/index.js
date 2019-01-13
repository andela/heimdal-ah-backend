import socketIo from './socketIo';
import handlers from './handlers';
import socketClient from './socketClient';


const events = {
  start(server, PORT) {
    socketClient(PORT);
    socketIo.connect(server, handlers);
  },
};


export default events;
