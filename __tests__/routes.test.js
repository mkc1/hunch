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
    return request.get('/').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
    })
});

test('POST game', (done) => {
    return request.post('/game')
    .send([{name: 'testname1!'}, {name: 'testname2!'}])
    .then((response) => {
        expect(response.statusCode).toBe(201);
        // expect(response.body.users.length).toBe(2);
        // expect(response.body.users[0].name).toBe('testname1!')
        done();
    });
});

describe('testing answers', () => {

    let game1;
    let user1;
    let user2;
    let user3;
    beforeEach((done) => {
    return Promise.all([
            User.create([{name: 'testname1!'}, {name: 'testname2!', _id: '59cb0b4e6618cd7e50788c11'}, {name: 'testname3!'}]),
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
            user3 = game.users[2];
            console.log(user1, user2, user3, 'the users')
            done();
        })
        .catch(error =>{
            console.log('error', error)
        })
    });

    test('POST answers', (done) => {
        return request.post('/game/answer')
        .send({
            game: game1._id,
            answer: 'a test answer',
            user: 'testname1!'
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

    describe('testing selections', () => {

        let answer1;
        let answer2;
        let answer3;
        beforeEach((done) => {
            console.log('selcs')
            return Game.findById(game1._id)
            .then(game=>{
                let answerArr = [
                    {answer: 'a test answer', user: user1._id},
                    {answer: 'testanswer user3', user: user3._id}
                ];

                answerArr.forEach(answer=> {
                    game.answers.push(answer);
                })
                return game.save();
            })
            .then(game =>{
                console.log('should have many answers', game.answers);
                answer1 = game.answers[0];
                answer2 = game.answers[1];
                answer3 = game.answers[2];
                done();
            })
        });

        test('add selection to answers', (done) => {

            return request.post('/game/selections')
            .send({
                selections: [{
                    answer: answer1._id,
                    selection: {
                        guessing_user: user1,
                        suspected_user: user2
                    }},
                    {
                    answer: answer3._id,
                    selection: {
                        guessing_user: user1,
                        suspected_user: user3
                    }}
                ],
                game: game1._id
            })
            .then(response => {
                expect(response.statusCode).toBe(201);

                response.body.answers.forEach(answer=> {
                    console.log('1st selections', answer.selections)
                })

                return request.post('/game/selections')
                .send({
                    selections: [{
                        answer: answer2._id,
                        selection: {
                            guessing_user: user2,
                            suspected_user: user3
                        }},
                        {
                        answer: answer3._id,
                        selection: {
                            guessing_user: user2,
                            suspected_user: user1
                        }}
                    ],
                    game: game1._id
                })
            })
            .then(response => {
                expect(response.statusCode).toBe(201);

                // user3 did not send in any selections.
                // user3's answer selections should be the
                // only selections with a length of 2
                let answer1selections = response.body.answers[0].selections;
                let answer2selections = response.body.answers[1].selections;
                let answer3selections = response.body.answers[2].selections;
                expect(answer1selections.length).toBe(1);
                expect(answer2selections.length).toBe(1);
                expect(answer3selections.length).toBe(2);
                done();
            });
        });

    });

});
