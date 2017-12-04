import React from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Form from './Form';
import { addGameCode } from './../actions';


class ChooseGame extends React.Component {
    constructor(props) {
        super(props);

        this.generateGameCode = this.generateGameCode.bind(this);
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleJoinGame = this.handleJoinGame.bind(this);
    }

    generateGameCode() {
        const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
        let code = '';
        for (var i = 0; i < 6; i++) {
            code += alphabet.charAt(Math.floor(Math.random()*alphabet.length-1));
        };
        return code;
    }

    handleNewGame() {
        let self = this;
        const newCode = this.generateGameCode();
        this.props.addGameCode(newCode);
        this.props.history.push('/start-game', {first: true});
    }

    handleJoinGame(code) {
        this.props.addGameCode(code);
        this.props.history.push('/start-game', {first: false});
    }

    render(){
        return(
            <div>
                <div>
                    <div className='panel'>
                        <div className='panel-title'>Start a new game</div>
                        <button className='submit-btn' onClick={
                            ()=>{this.handleNewGame()}}>Start</button>
                    </div>
                    <div className='or-div'>or</div>
                    <div className='panel'>
                        <div className='panel-title'>Join an existing game</div>
                        <Form formLabel='Enter game code' liftData={
                            (gameCode)=>this.handleJoinGame(gameCode)
                        } />
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addGameCode }, dispatch);
}

export default withRouter(connect(null,mapDispatchToProps)(ChooseGame));
