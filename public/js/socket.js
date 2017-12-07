import io from 'socket.io-client';
import * as actions from './actions';


export default function (store) {
    const socket = io();

    socket.on('connect', () => {
        console.log('connected');
    });
}