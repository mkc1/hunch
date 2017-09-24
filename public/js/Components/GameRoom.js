import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
let socket;

class GameRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayers: [{test10: true}, {test11: true}, {test12: false}, {test13: true}],
            game: null
        }
        this._connected = this._connected.bind(this);
        this._notifyNewPlayer = this._notifyNewPlayer.bind(this);
        this._updateCurrentPlayers = this._updateCurrentPlayers.bind(this);
        this.beginGame = this.beginGame.bind(this);
    }

    componentWillMount() {
        console.log('mount', this.context.router);
        socket = io();
        socket.on('connect', this._connected);
        socket.on('joined', this._notifyNewPlayer);
        socket.on('players', this._updateCurrentPlayers);
    }

    componentWillUnmount() {
        socket.emit('disconnect')
    }

    _connected() {
        const gameCode = this.props.location.state.code;
        const username = this.props.location.state.user;
        console.log('I have made a persistent two-way connection to the server!');
        // socket.emit('join-room', { code: gameCode, name: username });
    }

    _notifyNewPlayer(data) {
        const gameCode = this.props.location.state.code;
        console.log('player joined room!', data);
        socket.emit('get-current-players', gameCode);
    }

    _updateCurrentPlayers(data) {
        console.log('players', data);
        this.setState({ currentPlayers: this.state.currentPlayers.concat(data) },()=> {
            console.log('updated players')
        })
    }

    beginGame() {
        const users1 = this.state.currentPlayers.map((user)=>{
            if (Object.keys(user)[0]) {
                return { name: Object.keys(user)[0] };
            }
        })

        console.log(users1);

        axios.post('/game', {users: users1})
          .then((response)=> {
            console.log(response.data);
            this.setState({game: response.data })
          })
          .catch(function (error) {
            console.log(error);
        });
    }


    render() {
        const gameCode = this.props.location.state.code;
        const username = this.props.location.state.user;
        const isFirstPlayer = this.props.location.state.first;

        return(
            <div>
                <div>
                    <p>Hi {username}. Your game code is {gameCode}</p>
                </div>
                <div>
                    Players currently in game:
                </div>
                {(true) && (
                    <div>
                        <p>You are the first one here!</p>
                        <p>When all other players have joined the game, click 'start'!</p>
                        <button onClick={this.beginGame}>start</button>
                    </div>
                )}
                <div>
                {(this.state.game) && (
                    <Redirect to={{
                        pathname: '/game',
                        state: { 
                            game: this.state.game
                        }
                    }} push/>
                )}
                </div>
            </div>
        )
    }
}

export default GameRoom;
