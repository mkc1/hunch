import React from 'react';
import Form from './Components/Form';
import ChooseGame from './Components/ChooseGame';
import { Redirect, Link } from 'react-router-dom';

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
        };
    }

    render() {
        return(
            <div>
                <div>
                    <h2>Welcome! {this.state.username}</h2>
                </div>
                <div>
                    {(!this.state.username) && 
                        <Form liftData={
                            (name)=>this.setState({ username: name })
                        } />
                    }
                    {(this.state.username) &&
                        <ChooseGame username={this.state.username} />
                    }
                </div>
            </div>
        )
    };
}

export default Application;
