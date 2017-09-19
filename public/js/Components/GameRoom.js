import React from 'react';
import io from 'socket.io-client';
let socket;

class GameRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayers: [],
        }

        this._connected = this._connected.bind(this);
        this._notifyNewPlayer = this._notifyNewPlayer.bind(this);
        this._updateCurrentPlayers = this._updateCurrentPlayers.bind(this);
    }

    componentWillMount() {
        console.log('mount');
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
        socket.emit('join-room', { code: gameCode, name: username });
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
                    Players currently in game: {this.state.currentPlayers}
                </div>
                {(isFirstPlayer) && (
                    <div>
                        <p>You are the first one here!</p>
                        <p>When all other players have joined the game, click 'start'!</p>
                        <button>start</button>
                    </div>
                )}
            </div>
        )
    }
}

export default GameRoom;