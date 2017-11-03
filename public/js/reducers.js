import { combineReducers } from 'redux';

const ADD_USERNAME = "ADD_USERNAME";
const ADD_GAME = "ADD_GAME";
const ADD_ANSWER = "ADD_ANSWER";

let initial = {};

const rootReducer = function(state=initial, action) {
    console.log('REDUCER', state, action)
    let newState;
    switch (action.type) {
        case ADD_USERNAME:
            console.log('add username', action.payload)
            newState = Object.assign({}, state, {user: action.payload});
            return newState;
        case ADD_GAME:
            console.log('adding a game', action.payload)
            newState = Object.assign({}, state, {game: action.payload});
            return newState;
        case ADD_ANSWER:
            console.log('adding an answer', action.payload)
            newState = Object.assign({}, state, {answer: action.payload});
        default:
            return state;
    }
}



// const rootReducer = combineReducers({reducer: reducer});

export default rootReducer;