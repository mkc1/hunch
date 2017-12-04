import axios from 'axios';

export const addUsername = (username) => {
    return {
        type: "ADD_USERNAME",
        payload: username
    }
};

export const addGameCode = (code) => {
    return {
        type: "ADD_GAMECODE",
        payload: code
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

export const addSelections = (selections, user, gameId) => {
    console.log('add selections', selections, user, gameId);
    return {
        type: "server/add-selections",
        data: {selections, user, gameId}
    }
};

export const nextTopic = (gameId) => {
    console.log('nextTopic', gameId);
    return {
        type: "server/next-topic",
        data: gameId
    }
};

export const endOfRound = (gameId, currentPoints) => {
    console.log('endofRound', currentPoints, gameId);
    return {
        type: "server/end-of-round",
        data: {currentPoints, gameId}
    }
};
