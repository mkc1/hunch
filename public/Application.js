import React from 'react';
import io from 'socket.io-client';

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var socket = io();
    }

    render() {
        return(
            <div>
                <h2>Click <button onClick={this.handleClick}>here</button> to start a new game!</h2>
            </div>
        )
    }
}

export default Application;