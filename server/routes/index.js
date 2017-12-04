const router = require('express').Router();
const Game = require('./../models/index').Game;
const User = require('./../models/index').User;
const Topic = require('./../models/index').Topic;
const Answer = require('./../models/index').Answer;


module.exports = function(io) { 

    router.post('/game', (req, res, next) => {

        return Promise.all([User.create(req.body.users), Topic.find({})])
        .then(result =>{
            var newGame = new Game({ users: result[0], topics: result[1] });
            return newGame.save();
        })
        .then(game =>{
            io.to(req.body.gameCode).emit('created', game);
            res.sendStatus(201);
        })
        .catch(error =>{
            console.log('error', error);
        })
    });

    router.post('/game/answer', (req, res, next) => {
        console.log('the answer route', req.body)
        return User.findOne({ name: req.body.user  })
        .then(user=>{
            return Game.findOneAndUpdate({_id: req.body.game},
                {$addToSet: {answers: { answer: req.body.answer, user: user._id}}},
                {'new': true})
        })
        .then(game =>{
            console.log('game answers', game.answers);
            res.status(201).json(game.answers);
        })
        .catch(error =>{
            console.log('error', error);
        })
    });

    // router.post('/answer', (req, res, next) => {

    //     return Answer.create({answer: req.body.answer, user: req.body.user})
    //     .then(answer =>{
    //         return answer.populate('user');
    //     })
    //     .then(answer =>{
    //         res.status(201).json(answer);
    //     })
    //     .catch(error =>{
    //         console.log('error', error);
    //     })
    // });

    router.post('/game/selections', (req, res, next) => {

        console.log('made it to game!!!! selections', req.body.selection)

        // return Game.findOne({'answers._id': req.params.id})
        // .then(game =>{
        //     console.log('game!!!', game)
        //     var foundAnswer = game.answers.find(answer=>{
        //         return answer._id.toString()===req.params.id
        //     })
        //     foundAnswer.selections.push(req.body.selection);
        //     console.log('foundanswers?', foundAnswer.selections)
        //     return game.save();
        //     // return game.answers = game.answers.map(answer =>{
        //     //     if (answer._id.toString()===req.params.id) {
        //     //         answer.selections.push(req.body.selection)
        //     //     }
        //     //     console.log('answerrrr', answer)
        //     //     return answer;
        //     // })
        //     // console.log('the game?!!!!!', game)
        //     // // console.log('answer?!', game.answers.id(req.params.id))
        //     // // game.answers.id(req.params.id).selections.push(req.body)
        //     // // return game.save()
        // })
        // .then(game =>{
        //     res.status(201).send(game);
        // })
        // .catch(error =>{
        //     console.log('error', error)
        // })

        return Game.findById(req.body.game)
        .then(game =>{
            console.log('game!!!', game)

            req.body.selections.forEach(selection =>{

                var foundAnswer = game.answers.find(answer =>{
                    return (answer._id.toString()===selection.answer)
                })
                foundAnswer.selections.push(selection.selection)
            })

            return game.save();
        })
        .then(game =>{
            console.log('saved', game.answers)
            res.status(201).send(game);
        })
        .catch(error =>{
            console.log('error', error)
        })
    });

    router.post('/end-of-round', (req, res, next) => {

        console.log('made it to game!!!! selections', req.body)

        return Game.findById(req.body.gameId)
        .then(game =>{
            console.log('game', game);

            game.users.forEach(user =>{
                if (req.body.currentPoints[user.name]) {
                    user.points = req.body.currentPoints[user._id]++;
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

    })

    return router;
}
