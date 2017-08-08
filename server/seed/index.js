const topics = require('./topics.js');
const Topic = require('./../models/index.js').Topic;


Topic.remove({}, function (err) {
  if (err) return handleError(err);
  console.log('removed!')
})
.then(function(){
    return Topic.insertMany(topics, function(error, docs) {
        console.log('inserted!')
    });
})
.then(function(){
    return Topic.find({}, function(err, topics) {
        console.log(topics, 'topics!')
    })
})