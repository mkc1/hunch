import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Form from './Form';

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
        let newCode = this.generateGameCode();
        this.setState({
            gameCode: newCode,
            firstPlayer: true,
            fireRedirect: true
        });
    }

    handleJoinGame(code) {
        let gameCode = code;
        console.log('game code', gameCode);
        this.setState({
            gameCode: gameCode,
            fireRedirect: true 
        });
    }

    render(){
        console.log('username from choosegame', this.props.username);
        return(
            <div>
                {(!this.state.fireRedirect) && (
                    <div>
                        <div>
                            <h3>start new game</h3>
                            <button onClick={()=>{this.handleNewGame()}}>new game</button>
                        </div>
                        <div>
                            <h3>join existing game</h3>
                            <Form liftData={
                                (gameCode)=>this.handleJoinGame(gameCode)
                            } />
                        </div>
                    </div>
                )}
                {(this.state.fireRedirect) && (
                    <Redirect to={{
                        pathname: '/start-game',
                        state: { 
                            code: this.state.gameCode,
                            user: this.props.username,
                            first: this.state.firstPlayer 
                        }
                    }} push/>
                )}
            </div>
    )}
}

export default ChooseGame;