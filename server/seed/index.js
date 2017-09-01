const topics = require('./topics.js');
const Topic = require('./../models/index.js').Topic;


Topic.remove({})
.then(() => Topic.insertMany(topics))
.then(topics => console.log('here they are', topics))
.catch(err => console.log('error', err));