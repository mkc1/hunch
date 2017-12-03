import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';
let socket = io();
// import socket from './socket.js';
import createSocketIoMiddleware from 'redux-socket.io';
import rootReducer from './reducers';
import css from './../style.css';
import Application from './Application';
import GameRoom from './Components/GameRoom';
import Game from './Components/Game';
import Selections from './Components/Selections';
import AnswerReveal from './Components/AnswerReveal';
import EndGame from './Components/EndGame';
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

document.title = 'Hunch';

// let preloaded = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : undefined;

// console.log('preloaded?', preloaded);
const store = createStore(rootReducer, applyMiddleware(socketIoMiddleware, thunk));

// socket(store);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className='app-container'>
        <div className='logo-container'>
            <h2 className='logo'>Hunch</h2>
        </div>
        <div className="main-container">
          <Switch>
            <Route exact path='/' component={ Application }/>
            <Route path='/start-game' component={ GameRoom }/>
            <Route path='/game' component={ Game }/>
            <Route path='/selections' component={ Selections }/>
            <Route path='/results' component={ AnswerReveal }/>
            <Route path='/end-game' component={ EndGame }/>
        </Switch>
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);

store.subscribe(()=>{
    const state = store.getState();
    localStorage.setItem('state', JSON.stringify(state));
})

