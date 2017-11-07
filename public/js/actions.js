import axios from 'axios';
import { normalize } from 'normalizr';
import { gameSchema } from './api';
// import socket from './socket.js';

export const addUsername = (username) => {
    console.log("you're trying to add a username", username);
    return {
        type: "ADD_USERNAME",
        payload: username
    }
};

export const createGame = (users, gameCode) => {
    console.log('create game');
    // return dispatch => {
    //     axios.post('/game', {users: users, gameCode: gameCode})
    //     .then((response)=> {
    //         console.log('json?', response.body);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }
};

// export const addAnswer = (answer, user, gameId) => {
//     console.log('trying to add this answer', answer, user, gameId);
//     return {
//         type: 'server/add-answer',
//         data: {answer: answer, user: user, gameId: gameId}
//     }

    // return dispatch => {
    //     socket.emit('adding-answer', { answer: answer, user: user, gameId: gameId });
    // }
    // console.log('add answer', answer, username, gameId);
    // return dispatch => {
    //     axios.post('/game/answers', {answer: answer, user: user, game: gameId})
    //     .then((response)=> {
    //         console.log('posted answer', response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }
// };

// export const loadInitialDataSocket = (socket) => {
//     return (dispatch) => {
//         // dispatch(clearAllItems())
//         socket.on('initialList',(res)=>{
//            console.dir(res)
//            dispatch(initialItems(res))
//        })
//     }   
// }

// *** redux-socket.io actions ***

export const connectSocket = (data) => {
    console.log('connectsockettt', data)
    return {
        type: "server/join-room",
        data: data
    }
}

export const addGame = (users) => {
    console.log('game success', users);
    console.log('normalized game', users);
    return {
        type: "server/add-game",
        data: users
    }
};

export const addAnswer = (answer, user, gameId) => {
    console.log('trying to add this answer', answer, user, gameId);
    return {
        type: 'server/add-answer',
        data: {answer: answer, user: user, gameId: gameId}
    }

    // return dispatch => {
    //     socket.emit('adding-answer', { answer: answer, user: user, gameId: gameId });
    // }
    // console.log('add answer', answer, username, gameId);
    // return dispatch => {
    //     axios.post('/game/answers', {answer: answer, user: user, game: gameId})
    //     .then((response)=> {
    //         console.log('posted answer', response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }
};
