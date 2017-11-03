import io from 'socket.io-client';

const socket = io();

socket.on('connect', () => console.log("CONNECTED!"));
socket.on('joined', notifyNewPlayer);

function notifyNewPlayer (socketId, name, gameCode) {
    console.log('player joined room!', socketId, name);
    socket.emit('get-current-players', gameCode);
}

export default socket;