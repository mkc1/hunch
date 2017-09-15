import React from 'react';
import io from 'socket.io-client';
import { Redirect, Link } from 'react-router-dom';

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            fireRedirect: false,
        };

        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const socket = io();
        console.log('socket connection');
    }

    handleNameInput(e) {
        this.setState({ username: e.target.value });
        console.log('this', this.state.username);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ fireRedirect: true });
        return;
    }

    render() {
        console.log(this.state.fireRedirect);
        const { from } = this.props.location.state || '/';
        console.log('location', this.props.location);
        return(
                <div>
                    <div>
                        <h2>Welcome!</h2>
                    </div>
                    <div>
                        <p>Enter your name, then click next to get started.</p>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Name:
                                <input type="text" name="name" />
                            </label>
                            <input type="submit" value="submit" />
                        </form>
                        {(this.state.fireRedirect) && (
                            <Redirect to={'/game'} push/>
                        )}
                    </div>
            </div>
        );
    }
}

export default Application;