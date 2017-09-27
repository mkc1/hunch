const router = require('express').Router();
const Game = require('./../models/index').Game;
const User = require('./../models/index').User;
const Topic = require('./../models/index').Topic;
const Answer = require('./../models/index').Answer;

router.post('/game', (req, res, next) => {

    return Promise.all([User.create(req.body), Topic.find({})])
    .then(result =>{
        var newGame = new Game({ users: result[0], topics: result[1] });
        return newGame.save();
    })
    .then(game =>{
        res.status(201).json(game);
    })
    .catch(error =>{
        console.log('error', error);
    })
});

router.post('/answer', (req, res, next) => {

    return Game.findOneAndUpdate({_id: req.body.game},
            {$addToSet: {answers: { answer: req.body.answer, user: req.body.user}}},
            {'new': true})
    .then(game =>{
        res.sendStatus(201);
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

router.put('/answer/:id', (req, res, next) => {
    return Game.findOne({'answers._id': req.params.id})
    .then(game =>{
        // game.answers = game.answers.map(answer =>{
        //     if (answer._id.toString()===req.params.id) {
        //         answer.selections.push(req.body.selection)
        //     }
        //     return answer;
        // })
        game.answers.id(req.params.id).selections.push(req.body)
        return game.save()
    })
    .then(game =>{
        console.log('saved game?????', game)
        res.status(201).send(game);
    })
})  

module.exports = router;
