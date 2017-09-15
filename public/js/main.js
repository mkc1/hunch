import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import css from './style.css';
import Application from './Application';
import Game from './Game';


ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={Application}/>
      <Route path='/game' component={Game}/>
    </Switch>
  </Router>,
  document.getElementById('app')
);