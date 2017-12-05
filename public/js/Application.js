import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Components/Home';
import GameRoom from './Components/GameRoom';
import SubmitAnswer from './Components/SubmitAnswer';
import Selections from './Components/Selections';
import AnswerReveal from './Components/AnswerReveal';
import EndGame from './Components/EndGame';


function Application(props){
    return(
        <Router>
          <div className='app-container'>
            <div className='logo-container'>
                <div className='logo'>HUNCH</div>
                <div className='right-side'>
                    {(props.username) &&
                        <div className='welcome-message'>welcome {props.username}!</div>
                    }
                </div>
            </div>
            <div className="main-container">
              <Switch>
                <Route exact path='/' component={ Home }/>
                <Route path='/start-game' component={ GameRoom }/>
                <Route path='/game' component={ SubmitAnswer }/>
                <Route path='/selections' component={ Selections }/>
                <Route path='/results' component={ AnswerReveal }/>
                <Route path='/end-game' component={ EndGame }/>
            </Switch>
            </div>
          </div>
        </Router>
    );
}

function mapStateToProps(state) {
    return {
        username: state.username
    };
}

export default connect(mapStateToProps)(Application);
