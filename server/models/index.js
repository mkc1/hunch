const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/hunch');


const UserSchema = new Schema({
    name: {
        type: String
    },
    points: {
        type: Number
    },
    answer: { 
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }
})

const TopicSchema = new Schema({
    topic: {
        type: String
    }
})

const GameSchema = new Schema({
    currentTopic: { 
        type: Schema.Types.ObjectId,
        ref: 'Topic' },
    round: {
        type: Number
    },
    users: [UserSchema],
    topics: [TopicSchema]
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
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    },
    answer: {
        type: String 
    },
    selections: [SelectionSchema]
})

const Game = mongoose.model('Game', GameSchema);
const User = mongoose.model('User', UserSchema);
const Topic = mongoose.model('Topic', TopicSchema);
const Answer = mongoose.model('Answer', AnswerSchema);
const Selection = mongoose.model('Selection', SelectionSchema);



module.exports = {
    Game: Game,
    User: User,
    Topic: Topic,
    Answer: Answer,
    Selection: Selection
}
