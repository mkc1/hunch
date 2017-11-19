'use strict';

var socketio = require('socket.io');
const Game = require('./../models/index').Game;
const User = require('./../models/index').User;
const Topic = require('./../models/index').Topic;
const Answer = require('./../models/index').Answer;

let gameCode;

module.exports = (server) => {
    var io = socketio(server);

    io.on('connection', (socket)=>{
        console.log('socket io connection success?');

        // socket.on('join-room', function(data) {
        //     gameCode = data.code;
        //     socket.join(gameCode);
        //     socket.name = data.name;
        //     console.log('name1', socket.name);
        //     console.log('just joined', socket.id, data.name);
        //     io.to(gameCode).emit('joined', socket.id, data.name, gameCode);
        // });

        socket.on('action', (action) => {
            console.log('an action')
            if(action.type === 'server/join-room'){
                console.log('joining room', action);
                gameCode = action.data.code;
                socket.join(gameCode);
                socket.name = action.data.name;
                console.log('name1', socket.name);
                console.log('just joined', socket.id, action.data.name);
                // socket.emit('action', {type:'message', data:'good day!'});

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
                // io.to(gameCode).emit('players', players);
                io.to(gameCode).emit('action', {type: 'joined', data: players});

            } else if (action.type === 'server/add-game') {
                console.log('add data', action.data)
                Promise.all([User.create(action.data), Topic.find({})])
                .then(result =>{
                    console.log('getting a result', result)
                    var newGame = new Game({ users: result[0], topics: result[1] });
                    return newGame.save();
                })
                .then(game =>{
                    io.to(gameCode).emit('action', {type: 'new-game', data:game});
                })
                .catch(error =>{
                    console.log('error', error);
                })
            } else if (action.type === 'server/add-answer') {
                console.log('add answer', action.data)
                // User.findOne({ name: action.data.user  })
                // .then(user=>{
                //     return Game.findOneAndUpdate({_id: action.data.gameId},
                //         {$addToSet: {answers: { answer: action.data.answer, user: user._id}}},
                //         {'new': true})
                // })
                // .then(game =>{
                //     io.to(gameCode).emit('game with answers', game);
                //     // console.log('game answers', game.answers);
                //     // res.status(201).json(game.answers);
                // })
                // .catch(error =>{
                //     console.log('error', error);
                // })
        
                Game.findById(action.data.gameId)
                .populate('users')
                .populate('topics')
                .then(game =>{
                    console.log('gameusers', game.users)
                    console.log(action.data)
                    let user = game.users.find((user)=>user.name===action.data.user)
                    console.log('userrrr', user);
                    game.answers.push({ answer: action.data.answer, user: user._id, selections: [] });
                    return game.save();
                    // io.to(gameCode).emit('game with answers', game);
                    // console.log('game answers', game.answers);
                    // res.status(201).json(game.answers);
                })
                .then(savedGame => {
                    console.log('game:', savedGame)
                    io.to(gameCode).emit('action', {type: 'new-game', data: savedGame});
                })
                .catch(error =>{
                    console.log('error', error);
                })
            } else if (action.type === 'server/add-selections') {

                Game.findById(action.data.gameId)
                .populate('users')
                .populate('answers')
                .then(game =>{
                    console.log('game!!!', action.data.selections)

                    let user_g = game.users.find((user)=>user.name===action.data.user);

                    game.answers.forEach(answer =>{
                        if (action.data.selections[answer._id]) {
                            console.log('um', action.data.selections[answer._id])
                            let user_s = game.users.find((user)=>user.name==action.data.selections[answer._id])
                            let isCorrect = (user_g._id===user_s._id);
                            answer.selections.push({guessing_user: user_g._id, suspected_user: user_s._id, correct: isCorrect});
                        }
                    })

                    return game.save();
                })
                .then(savedGame => {
                    console.log('game?!:', savedGame.answers)
                    io.to(gameCode).emit('action', {type: 'new-game', data: savedGame});
                })
                .catch(error =>{
                    console.log('error', error);
                })
            } else if (action.type === 'server/end-of-round') {

                Game.findById(action.data.gameId)
                .then(game =>{
                    console.log('game', game);

                    game.users.forEach(user =>{
                        if (action.data.currentPoints[user.name]) {
                            user.points = action.data.currentPoints[user._id]++;
                        }
                    })
                    game.answers.forEach(answer =>{
                        game.answers.pull(answer._id);
                    })
                    game.round = game.round++;
                    return game.save();
                })
                .then(savedGame => {
                    console.log('game?!:', savedGame.round, savedGame.answers)
                    io.to(gameCode).emit('action', {type: 'new-game', data: savedGame});
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
