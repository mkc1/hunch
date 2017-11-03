import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import socket from './socket.js';
import rootReducer from './reducers';
import css from './../style.css';
import Application from './Application';
import GameRoom from './Components/GameRoom';
import Game from './Components/Game';

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
    <Router>
        <Switch>
          <Route exact path='/' component={ Application }/>
          <Route path='/start-game' component={ GameRoom }/>
          <Route path='/game' component={ Game }/>
        </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
