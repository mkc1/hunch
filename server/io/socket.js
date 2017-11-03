'use strict';

var socketio = require('socket.io');

module.exports = (server) => {
    var io = socketio(server);

    io.on('connection', (socket)=>{
        console.log('socket io connection success?');

        socket.on('join-room', function(data) {
            const gameCode = data.code;
            socket.join(gameCode);
            socket.name = data.name;
            console.log('name1', socket.name);
            console.log('just joined', socket.id, data.name);
            io.to(gameCode).emit('joined', socket.id, data.name, gameCode);
        });

        socket.on('get-current-players', function(gameCode){
            // console.log('trying to get players', gameCode);
            var clients = io.sockets.adapter.rooms[gameCode].sockets;
            let name;
            var players = [];
            console.log('players', players)
            for (var key in clients) {
                if (clients.hasOwnProperty(key)) {
                    console.log('named?!?!', io.sockets.connected[key].name)
                    name = io.sockets.connected[key].name
                    players.push(name);
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
