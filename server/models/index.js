const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('./../../config/index.js');

const url = config.db;

mongoose.connect(url, {
  useMongoClient: true,
});


const UserSchema = new Schema({
    name: {
        type: String
    },
    points: {
        type: Number,
        default: 0
    }
})

const TopicSchema = new Schema({
    topic: {
        type: String
    }
})

const SelectionSchema = new Schema({
    guessing_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    suspected_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    correct: {
        type: Boolean
    }
})

const AnswerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answer: {
        type: String 
    },
    selections: [SelectionSchema]
})

const GameSchema = new Schema({
    round: {
        type: Number,
        default: 1
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    answers: [AnswerSchema]
})


// topic schema methods
TopicSchema.statics.getFiveRandomTopics = function(cb) {
    var random = undefined;
    var usedIndexes = [];
    var list = [];

    return Topic.find({}, function(err, topics){
       return topics;
    })
    .then(function(topics){
        for (var i=0; i<5;i++) {
            random = Math.floor(Math.random() * topics.length);
            while (usedIndexes.indexOf(random)>-1){
                random = Math.floor(Math.random() * topics.length);
            };
            list.push(topics[random]);
            usedIndexes.push(random);
        }
        return list;
    })
};

const Game = mongoose.model('Game', GameSchema);
const User = mongoose.model('User', UserSchema);
const Topic = mongoose.model('Topic', TopicSchema);

module.exports = {
    Game: Game,
    User: User,
    Topic: Topic
}
