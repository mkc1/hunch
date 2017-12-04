import { combineReducers } from 'redux';

const ADD_GAME = "ADD_GAME";
const ADD_ANSWER = "ADD_ANSWER";

let initialState = {currentPlayers: []};

const rootReducer = function(state=initialState, action) {
    let newState;
    switch (action.type) {
        case 'ADD_USERNAME':
            newState = Object.assign({}, state, {username: action.payload});
            return newState;
        case 'ADD_GAMECODE':
            newState = Object.assign({}, state, {gamecode: action.payload});
            return newState;
        case ADD_GAME:
            console.log('adding a game', action.payload)
            newState = Object.assign({}, state, {game: action.payload});
            return newState;
        case ADD_ANSWER:
            console.log('adding an answer', action.payload)
            newState = Object.assign({}, state, {answer: action.payload});
        case 'joined':
            console.log('a test', action.data);
            newState = { currentPlayers: [].concat(action.data) }
            return Object.assign({}, state, newState);
            // newState = Object.assign({}, state, {currentPlayers: action.data});
            return newState;
        case 'new-game' || 'add-answer':
            console.log('new ga!!!!!!!!!!!!!!me', action.data);
            newState = Object.assign({}, state, {game: action.data});
            // newState = Object.assign({}, state, {currentPlayers: action.data});
            return newState;
        default:
            return state;
    }
}



// const rootReducer = combineReducers({reducer: reducer});

export default rootReducer;