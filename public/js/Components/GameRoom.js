import React from 'react';
// import socket from './../socket.js'
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { connectSocket, addGame, createGame } from './../actions';


class GameRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayers: []
        }
        // this._connected = this._connected.bind(this);
        this._notifyNewPlayer = this._notifyNewPlayer.bind(this);
        this._updateCurrentPlayers = this._updateCurrentPlayers.bind(this);
        this._beginGame = this._beginGame.bind(this);
        this.createGame = this.createGame.bind(this);
        this.copyCode = this.copyCode.bind(this);
    }

    componentDidMount() {
        const gameCode = this.props.location.state.code;
        const username = this.props.location.state.user;

        this.props.connectSocket({ code: gameCode, name: username })
        // socket = io();

        // console.log('thisshould be the socket', socket);
        // socket.on('connect', this._connected);
        // socket.on('joined', this._notifyNewPlayer);
        // socket.on('players', this._updateCurrentPlayers);
        // socket.on('created', this._beginGame);

        // socket.emit('join-room', { code: gameCode, name: username });
    }

    _connected() {
        // const gameCode = this.props.location.state.code;
        // const username = this.props.location.state.user;
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
        this.setState({ currentPlayers: [].concat(data) },()=> {
            console.log('updated players', this.state.currentPlayers);
        })
    }

    createGame() {
        // const users1 = this.state.currentPlayers.map((user)=>{
        //     if (Object.keys(user)[0]) {
        //         return {name: Object.keys(user)[0]};
        //     }
        // })

        const users = this.props.currentPlayers.map(user=>{
            return { name: user }
        })

        console.log('create', users);

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

    _beginGame(data) {
        console.log('begin game', data, this.props.location.state.code);
        // this.props.addGame(this.props.currentPlayers);
        // this.setState({game: data},()=> {
        //     console.log('new game!!!', this.state.game);
        // })
        // return;
    }


    render() {
        const gameCode = this.props.location.state.code;
        const username = this.props.location.state.user;
        const isFirstPlayer = this.props.location.state.first;

        // console.log('this props rendering', this.props)

        return(
            <div  className='panel'>
                <div>
                    <div id='flash-container' className='flash-container'>
                        <p className='flash-text'>Code copied to clipboard &#10004;</p>
                    </div>
                    <p>Your game code is <a className='game-code' onClick={this.copyCode}>{gameCode}</a></p>
                </div>
                <div>
                    Players currently in game: {this.props.currentPlayers}
                </div>
                {(isFirstPlayer) && (
                    <div>
                        <p>You are the first one here!</p>
                        <p>When all other players have joined the game, click 'start'!</p>
                        <button className='submit-btn' onClick={this.createGame}>Start</button>
                    </div>
                )}
                <div>
                {(this.props.game) && (
                    <Redirect to={{
                        pathname: '/game',
                        state: {
                            user: this.props.location.state.user
                        }
                    }} push/>
                )}
                </div>
            </div>
        )
    }
};

function mapStateToProps(state) {
    console.log('state also', state);
    return {
        currentPlayers: state.currentPlayers,
        game: state.game
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addGame, createGame, connectSocket }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);
