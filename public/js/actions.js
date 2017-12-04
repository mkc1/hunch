
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

// *** redux-socket.io actions ***

export const connectSocket = (data) => {
    return {
        type: "server/join-room",
        data: data
    }
};

export const addGame = (users) => {
    console.log('starting game', users)
    return {
        type: "server/add-game",
        data: users
    }
};

export const addAnswer = (answer, user, gameId) => {
    console.log('adding answer')
    return {
        type: 'server/add-answer',
        data: {answer: answer, user: user, gameId: gameId}
    }
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
