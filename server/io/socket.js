'use strict';

var socketio = require('socket.io');
const Game = require('./../models/index').Game;
const User = require('./../models/index').User;
const Topic = require('./../models/index').Topic;
const Answer = require('./../models/index').Answer;

module.exports = (server) => {
    var io = socketio(server);

    io.on('connection', (socket)=>{

        console.log('socket io connection success');

        socket.on('action', (action) => {
        let gameCode;

            if (action.type === 'server/join-room'){

                gameCode = action.data.code;
                socket.join(gameCode);
                socket.name = action.data.name;

                var clients = io.sockets.adapter.rooms[gameCode].sockets;
                let name;
                var players = [];

                for (var key in clients) {
                    if (clients.hasOwnProperty(key)) {
                        name = io.sockets.connected[key].name
                        players.push(name);
                    };
                };

                io.to(gameCode).emit('action', {type: 'JOINED-GAME', data: players});

            } else if (action.type === 'server/add-game') {

                Promise.all([User.create(action.data), Topic.getFiveRandomTopics()])
                .then(result =>{
                    var newGame = new Game({ users: result[0], topics: result[1] });
                    return newGame.save();
                })
                .then(game =>{
                    io.to(gameCode).emit('action', {type: 'NEW-GAME', data: game});
                })
                .catch(error =>{
                    console.log('error', error);
                })

            } else if (action.type === 'server/add-answer') {
        
                Game.findById(action.data.gameId)
                .populate('users')
                .populate('topics')
                .then(game =>{
                    let user = game.users.find((user)=>user.name===action.data.user);
                    game.answers.push({ answer: action.data.answer, user: user._id, selections: [] });
                    return game.save();
                })
                .then(savedGame => {
                    console.log('saved game:', savedGame)
                    io.to(gameCode).emit('action', {type: 'NEW-GAME', data: savedGame});
                })
                .catch(error =>{
                    console.log('error', error);
                })

            } else if (action.type === 'server/add-selections') {

                console.log('adding selections', action.data)

                Game.findById(action.data.gameId)
                .populate('users')
                .populate('answers')
                .then(game =>{
                    let guessing_user = game.users.find((user)=>user.name===action.data.user);

                    game.answers.forEach(answer =>{
                        if (action.data.selections[answer._id]) {

                            console.log(action.data.selections[answer._id])
                            console.log(action.data.selections[answer._id])

                            let suspected_user = game.users.find((user)=>{
                                console.log(user.name, action.data.selections[answer._id])
                                return user.name==action.data.selections[answer._id];
                            });

                            console.log('gs', guessing_user, suspected_user)
                            let isCorrect = (suspected_user._id.toString()===answer.user.toString());
                            if (isCorrect) {
                                guessing_user.points = guessing_user.points + 1;
                                guessing_user.save();
                            }
                            answer.selections.push({
                                guessing_user: guessing_user._id,
                                suspected_user: suspected_user._id,
                                correct: isCorrect
                            });
                        }
                    })
                    return game.save();
                })
                .then(savedGame => {
                    console.log('answers with selections:', savedGame.answers);
                    console.log('users saved', savedGame.users);
                    io.to(gameCode).emit('action', {type: 'NEW-GAME', data: savedGame});
                })
                .catch(error =>{
                    console.log('error', error);
                })
            } else if (action.type === 'server/next-topic') {

                Game.findById(action.data)
                .populate('users')
                .populate('topics')
                .then(game =>{
                    game.round = game.round+1;
                    game.answers = [];
                    return game.save();
                })
                .then(savedGame => {
                    console.log('updated game:', savedGame.round, savedGame.answers, savedGame.users);
                    io.to(gameCode).emit('action', {type: 'NEW-GAME', data: savedGame});
                })
                .catch(error =>{
                    console.log('error', error);
                })
            } else if (action.type === 'server/end-game') {

                Game.findById(action.data)
                .populate('users')
                .populate('topics')
                .then(game =>{
                    let winningUser = null;
                    game.users.forEach(()=>{
                        if (!winningUser) return user;
                        if (winningUser.points<user.points) return user;
                    })
                    console.log('this user won with this many points', user.name, user.points)
                })
                .then(savedGame => {
                    console.log('game?SAVED!:', savedGame.round, savedGame.answers, savedGame.users)
                    io.to(gameCode).emit('action', {type: 'UPDATED-GAME', data: savedGame});
                })
                .catch(error =>{
                    console.log('error', error);
                })
            }
        })

        // socket.on('get-current-players', function(gameCode){
        //     // console.log('trying to get players', gameCode);
        //     var clients = io.sockets.adapter.rooms[gameCode].sockets;
        //     let name;
        //     var players = [];
        //     console.log('players', players)
        //     for (var key in clients) {
        //         if (clients.hasOwnProperty(key)) {
        //             console.log('named?!?!', io.sockets.connected[key].name)
        //             name = io.sockets.connected[key].name
        //             players.push(name);
        //         };
        //     };
        //     console.log(players, gameCode)
        //     io.to(gameCode).emit('players', players);
        // })

        // socket.on('adding-answer', function(data){

        //     console.log('adding-answer', data);

        //     User.findOne({ name: data.user  })
        //     .then(user=>{
        //         return Game.findOneAndUpdate({_id: data.gameId},
        //             {$addToSet: {answers: { answer: data.answer, user: user._id}}},
        //             {'new': true})
        //     })
        //     .then(game =>{
        //         io.to(gameCode).emit('game with answers', game);
        //         // console.log('game answers', game.answers);
        //         // res.status(201).json(game.answers);
        //     })
        //     .catch(error =>{
        //         console.log('error', error);
        //     })
        //     // console.log('trying to get players', gameCode);
        //     // var clients = io.sockets.adapter.rooms[gameCode].sockets;
        //     // let name;
        //     // var players = [];
        //     // console.log('players', players)
        //     // for (var key in clients) {
        //     //     if (clients.hasOwnProperty(key)) {
        //     //         console.log('named?!?!', io.sockets.connected[key].name)
        //     //         name = io.sockets.connected[key].name
        //     //         players.push(name);
        //     //     };
        //     // };
        //     // console.log(players, gameCode)
        //     // io.to(gameCode).emit('players', players);
        // })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


    });

    return io;
};
