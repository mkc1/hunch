const router = require('express').Router();
const Game = require('./../models/index').Game;
const User = require('./../models/index').User;
const Topic = require('./../models/index').Topic;

router.post('/game', (req, res, next) => {

    return Promise.all([User.create(req.body.users), Topic.find({})])
    .then(result =>{
        console.log('topics', result)
        var newGame = new Game({ users: result[0], topics: result[1] });
        return newGame.save();
    })
    .then((game)=>{
        res.status(201).json(game);
    })
    .catch(error=>{
        console.log('error', error)
    })

});

module.exports = router;
