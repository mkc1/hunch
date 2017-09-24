const app = require('./../app.js');
const bodyParser = require('body-parser');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const Game = require('./../server/models/index').Game;
const User = require('./../server/models/index').User;
const Topic = require('./../server/models/index').Topic;


beforeEach((done) => {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }
    console.log('done first')
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
