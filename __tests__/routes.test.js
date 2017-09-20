const app = require('./../app.js');
const bodyParser = require('body-parser');
const request = require('supertest')(app);
const mongoose = require('mongoose');


describe('testing', ()=>{

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
            console.log('response.body', response.body);
            done();
        });
    });
});