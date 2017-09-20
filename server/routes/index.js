const router = require('express').Router();
const Game = require('./../models/index').Game;
const User = require('./../models/index').User;
const Topic = require('./../models/index').Topic;

router.post('/game', (req, res, next) => {
    User.create(req.body)
    .then((newUsers)=>{
        console.log('users', newUsers);
        var newGame = new Game({
            users: newUsers
        });

        return newGame.save();
    })
    .then((game)=>{
        res.status(201).json(game);
    })
    .then(null, next);
});

router.post('/user', (req, res, next) => {
    Game.findOne({_id: req.body.gameId})
    .then((game) => {
        var newUser = new User({
            name: req.body.name
        })
        game.users.push(newUser._id)
    })
    User.create({name: req.username})

})

module.exports = router;