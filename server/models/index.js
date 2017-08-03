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

const GameSchema = new Schema({
    currentQuestion: { 
        type: Schema.Types.ObjectId,
        ref: 'Question' },
    round: {
        type: Number
    },
    users: [UserSchema],
    questions: [QuestionSchema]
})

const QuestionSchema = new Schema({
    question: {
        type: String
    }
})

const AnswerSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    answer: {
        type: String 
    },
    selections: [SelectionSchema]
})

const SelectionSchema = new Schema({
    guessing_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    suspected_user: {
        type: 
    }
    correct: {
        type: Boolean
    }
})

module.exports = {
    Game: GameSchema,
    User: UserSchema,
    Question: QuestionSchema,
    Answer: AnswerSchema,
    Selection: SelectionSchema
}
