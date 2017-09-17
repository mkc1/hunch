import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import css from './../style.css';
import Application from './Application';
import GameRoom from './Components/GameRoom';


ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={Application}/>
      <Route path='/start-game' component={ GameRoom }/>
    </Switch>
  </Router>,
  document.getElementById('app')
);