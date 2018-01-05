import { combineReducers } from 'redux';

let initialState = {currentPlayers: []};

const rootReducer = function(state=initialState, action) {
    let newState;
    console.log('reducer', action.type);
    switch (action.type) {
        case 'ADD_USERNAME':
            newState = Object.assign({}, state, {username: action.payload});
            return newState;
        case 'ADD_GAMECODE':
            newState = Object.assign({}, state, {gamecode: action.payload});
            return newState;
        case 'ADD_ANSWER':
            newState = Object.assign({}, state, {answer: action.payload});
        case 'JOINED-GAME':
            newState = { currentPlayers: [].concat(action.data) }
            return Object.assign({}, state, newState);
            // newState = Object.assign({}, state, {currentPlayers: action.data});
            return newState;
        case 'NEW-GAME':
        console.log('reducer game');
            newState = Object.assign({}, state, {game: action.data});
            // newState = Object.assign({}, state, {currentPlayers: action.data});
            return newState;
        default:
            return state;
    }
}



// const rootReducer = combineReducers({reducer: reducer});

export default rootReducer;
