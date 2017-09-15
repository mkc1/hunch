var socketio = require('socket.io');

module.exports = (server) => {
    var io = socketio(server);

    io.on('connection', (socket)=>{
        console.log('socket io connection success')
    });

    return io;
};