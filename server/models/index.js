const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/hunch');


const UserSchema = new Schema({
    name: {
        type: String
    },
    points: {
        type: Number
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
        type: Number
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    answers: [AnswerSchema]
})

const Game = mongoose.model('Game', GameSchema);
const User = mongoose.model('User', UserSchema);
const Topic = mongoose.model('Topic', TopicSchema);

module.exports = {
    Game: Game,
    User: User,
    Topic: Topic
}