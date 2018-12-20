// // const socket = io.connect('http://localhost:9000');
// const socket = io.connect('http://localhost:9000');
// console.log(socket);

// socket.emit('connection', data => console.log('fgxdfuykfdxz'))
// // socket.listen(9000)
// //     (() => {
// //     io.on('connection', data => console.log('fgxdfuykfdxz'))
// // })();
// 

const socket = io.connect('http://localhost:9000');
socket.on('Notification Created', msg => console.log('notified', msg));
