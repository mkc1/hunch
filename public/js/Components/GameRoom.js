import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { connectSocket, addGame } from './../actions';


class GameRoom extends React.Component {
    constructor(props) {
        super(props);

        this.startGame = this.startGame.bind(this);
        this.copyCode = this.copyCode.bind(this);
    }

    componentDidMount() {
        this.props.connectSocket({ code: this.props.gameCode, name: this.props.username });
    }

    startGame() {
        const users = this.props.currentPlayers.map(user=>{
            return { name: user };
        });
        this.props.addGame(users);
    }

    copyCode() {
        var text = document.createElement("textarea");
        text.value = this.props.location.state.code;
        document.body.appendChild(text);
        text.select();
        document.execCommand('copy');
        document.body.removeChild(text);
        var flash = document.getElementById('flash-container');
        flash.style.visibility = 'visible';
        flash.style.opacity = '1';
        setTimeout(() => {
            flash.style.visibility = 'hidden';
            flash.style.opacity = '0';
        }, 1500);
    }

    render() {
        const isFirstPlayer = this.props.location.state.first;
        
        return(
            <div>
                <div className='panel left-panel'>
                    <div className='panel-title-sm'>Players currently in game:</div>
                    {this.props.currentPlayers.map(player => {
                        return <div className='name-list-item' key={player}>{player}</div>
                    })}
                </div>
                <div className='panel'>
                    <div>
                        <div id='flash-container' className='flash-container'>
                            <p className='flash-text'>Code copied to clipboard &#10004;</p>
                        </div>
                        <p>Your game code is <a className='game-code' onClick={this.copyCode}>{this.props.gamecode}</a></p>
                    </div>
                    {(isFirstPlayer) && (
                        <div>
                            <p>You are the first one here!</p>
                            <p>When all other players have joined the game, click 'start'!</p>
                            <button className='submit-btn' onClick={this.startGame}>Start</button>
                        </div>
                    )}
                    <div>
                    {(this.props.game) && (
                        <Redirect to={{
                            pathname: '/game'
                        }} push/>
                    )}
                    </div>
                </div>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        username: state.username,
        gamecode: state.gamecode,
        currentPlayers: state.currentPlayers,
        game: state.game
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addGame, connectSocket }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameRoom));
