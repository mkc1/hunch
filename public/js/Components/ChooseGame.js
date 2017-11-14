import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Form from './Form';
import { withRouter } from 'react-router';

class ChooseGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameCode: undefined,
            firstPlayer: false,
            fireRedirect: false,
        }

        this.generateGameCode = this.generateGameCode.bind(this);
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleJoinGame = this.handleJoinGame.bind(this);
    }

    generateGameCode() {
        // generate 6-digit code;
        const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
        let code = '';
        for (var i = 0; i < 6; i++) {
            code += alphabet.charAt(Math.floor(Math.random()*alphabet.length-1));
        };
        return code;
    }

    handleNewGame() {
        let self = this;
        console.log('handle new game', self.props.history)
        const newCode = this.generateGameCode();
        this.setState({
            gameCode: newCode,
            firstPlayer: true
        }, ()=>{self.props.history.push('/start-game', {code: newCode, user: this.props.username, first: true})});
    }

    handleJoinGame(code) {
        const gameCode = code;
        console.log('game code', gameCode, this.state.firstPlayer);
        this.setState({ gameCode: gameCode}, ()=>{
            this.props.history.push('/start-game', {code: gameCode, user: this.props.username, first: false});
        });
    }

    render(){
        console.log('username from choosegame', this.props.history);
        return(
            <div>
                {(!this.state.fireRedirect) && (
                    <div>
                        <div className='panel'>
                            <div className='panel-title'>Start a new game</div>
                            <button className='submit-btn' onClick={()=>{this.handleNewGame()}}>Start</button>
                        </div>
                        <div className='or-div'>or</div>
                        <div className='panel'>
                            <div className='panel-title'>Join an existing game</div>
                            <Form formLabel='Enter game code' liftData={
                                (gameCode)=>this.handleJoinGame(gameCode)
                            } />
                        </div>
                    </div>
                )}
            </div>
    )}
}


export default withRouter(ChooseGame);
