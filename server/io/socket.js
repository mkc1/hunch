'use strict';

var socketio = require('socket.io');
var Game = require('./../models/index').Game;
var User = require('./../models/index').User;

let gameCode;

module.exports = (server) => {
    var io = socketio(server);

    io.on('connection', (socket)=>{
        console.log('socket io connection success?');

        socket.on('join-room', function(data) {
            gameCode = data.code;
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

        socket.on('adding-answer', function(data){

            console.log('adding-answer', data);

            User.findOne({ name: data.user  })
            .then(user=>{
                return Game.findOneAndUpdate({_id: data.gameId},
                    {$addToSet: {answers: { answer: data.answer, user: user._id}}},
                    {'new': true})
            })
            .then(game =>{
                io.to(gameCode).emit('game with answers', game);
                // console.log('game answers', game.answers);
                // res.status(201).json(game.answers);
            })
            .catch(error =>{
                console.log('error', error);
            })
            // console.log('trying to get players', gameCode);
            // var clients = io.sockets.adapter.rooms[gameCode].sockets;
            // let name;
            // var players = [];
            // console.log('players', players)
            // for (var key in clients) {
            //     if (clients.hasOwnProperty(key)) {
            //         console.log('named?!?!', io.sockets.connected[key].name)
            //         name = io.sockets.connected[key].name
            //         players.push(name);
            //     };
            // };
            // console.log(players, gameCode)
            // io.to(gameCode).emit('players', players);
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


    });

    return io;
};
