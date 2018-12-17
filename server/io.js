const sio = require('socket.io');
let io = null;

exports.io = () => io;

exports.init = (server) => {
    io = sio(server, { origins: 'localhost:*' });

    io.on('connection', function (socket) {
        console.log('client conected');
    });
}
