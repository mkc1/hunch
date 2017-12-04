'use strict';

console.log('test config');

module.exports = {
    env: 'test',
    db: 'mongodb://127.0.0.1/hunchTEST',
    port: process.env.PORT || 3100,
};
