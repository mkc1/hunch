'use strict';

console.log('running the test config');

module.exports = {
    env: 'test',
    db: 'mongodb://localhost/hunchTEST',
    port: process.env.PORT || 3100,
};
