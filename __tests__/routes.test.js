const app = require('./../app.js');
const bodyParser = require('body-parser');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const Game = require('./../server/models/index').Game;
const User = require('./../server/models/index').User;
const Answer = require('./../server/models/index').Answer;
const Topic = require('./../server/models/index').Topic;
const topics = require('./../server/seed/topics.js');


beforeEach((done) => {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(()=>{});
    }
    Topic.insertMany(topics);
    return done();
});

afterAll((done) => {
    mongoose.disconnect();
    return done();
});

test('Testing root', (done) => {
    request.get('/').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
    })
});

test('POST api', (done) => {
    request.post('/game')
    .send([{name: 'testname1!'}, {name: 'testname2!'}])
    .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.users.length).toBe(2);
        expect(response.body.users[0].name).toBe('testname1!')
        done();
    });
});

describe('testing answers', () => {

    let game1;
    let user1;
    let user2;
    beforeEach((done) => {
    return Promise.all([
            User.create([{name: 'testname1!'}, {name: 'testname2!', _id: '59cb0b4e6618cd7e50788c11'}]),
            Topic.find({})
        ])
        .then(result =>{
            let newGame = new Game({
                users: result[0],
                topics: result[1]
            });
            return newGame.save();
        })
        .then((game)=>{
            return Game.findOneAndUpdate({_id: game._id},
            {$addToSet: {answers: { answer: 'this is the initial answer', user: '59cb0b4e6618cd7e50788c11'}}},
            {'new': true})
        })
        .then(game =>{
            console.log('the game', game)
            game1 = game;
            user1 = game.users[0];
            user2 = game.users[1];
            done();
        })
        .catch(error =>{
            console.log('error', error)
        })
    });

    test('POST answers', (done) => {
        console.log('user1', user1);
        request.post('/answer')
        .send({
            game: game1._id,
            answer: 'a test answer',
            user: user1._id
        })
        .then(response =>{
            expect(response.statusCode).toBe(201);
            return Game.findById(game1._id)
        })
        .then(game =>{
            expect(game.answers.length).toBe(2);
            done();
        })
    });

    test('add selection to answers', (done) => {

        console.log('answer id?', game1.answers[0]._id)

        request.put('/answer/' + game1.answers[0]._id)
        .send({
            guessing_user: user1._id,
            suspected_user: user2._id
        })
        .then(response => {
            let newSelections = response.body.answers[0].selections
            expect(response.statusCode).toBe(201);
            expect(newSelections.length).toBe(1);

            return Game.findById(game1._id).populate('answers.selections')
        })
        .then(game =>{
            console.log(game);
            let answer = game.answers.id(game1.answers[0]._id);
            console.log(answer.populate('selections'))
            // expect(selections.length).toBe(1);
            // console.log(selections)
        })
        .then(answer =>{
            console.log(answer)
            done();
        })
    })
});
