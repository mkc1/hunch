import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
import rootReducer from './reducers';
import css from './../style.css';
import Application from './Application';
// import GameRoom from './Components/GameRoom';
// import SubmitAnswer from './Components/SubmitAnswer';
// import Selections from './Components/Selections';
// import AnswerReveal from './Components/AnswerReveal';
// import EndGame from './Components/EndGame';

let socket = io();
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

document.title = 'Hunch';

let preloaded = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : undefined;

const store = createStore(rootReducer, applyMiddleware(socketIoMiddleware, thunk));


ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('app')
);

store.subscribe(()=>{
    const state = store.getState();
    localStorage.setItem('state', JSON.stringify(state));
});
