const topics = require('./topics.js');
const Topic = require('./../models/index.js').Topic;

console.log('running seed');


Topic.remove({})
.then(() => Topic.insertMany(topics))
.then(() => Topic.getFiveRandomTopics())
.catch(err => console.log('error', err));
