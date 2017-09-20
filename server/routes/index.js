const router = require('express').Router();
const Game = require('./../models/index').Game;
const User = require('./../models/index').User;

router.post('/game', (req, res, next) => {
    User.create({name: req.body.name})
    .then((user)=>{
        var newGame = new Game({
            users: [user._id]
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
