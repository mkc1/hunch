import io from 'socket.io-client';
import * as actions from './actions';

// const socket = io();

// socket.on('connect', () => console.log("CONNECTED!"));
// // socket.on('joined', notifyNewPlayer);

// // function notifyNewPlayer (socketId, name, gameCode) {
// //     console.log('player joined room!', socketId, name);
// //     socket.emit('get-current-players', gameCode);
// // }

// socket.on('game with answers', function(game) {
//     console.log('client socket', game);

// })
// export default socket;


export default function (store) {
    const socket = io();

    socket.on('connect', () => {
        console.log('connected')
    });

    socket.on('game with answers', function(game) {
        store.dispatch('actions.addGame', game);
    })
}