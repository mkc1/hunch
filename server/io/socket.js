var socketio = require('socket.io');

module.exports = (server) => {
    var io = socketio(server);

    io.on('connection', (socket)=>{
        console.log('socket io connection success?');

        socket.on('join-room', function (data) {
            const gameCode = data.code;
            socket.join(gameCode);
            console.log('just joined', socket.id, data.name);
            io.to(gameCode).emit('joined', data);
        });

        socket.on('get-current-players', function(gameCode){
            // console.log('trying to get players', gameCode);
            var clients = io.sockets.adapter.rooms[gameCode].sockets;
            var players = [];
            for (var key in clients) {
                if (clients.hasOwnProperty(key)) {
                    players.push(key);
                };
            };
            console.log(players, gameCode)
            io.to(gameCode).emit('players', players);
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


    });

    return io;
};