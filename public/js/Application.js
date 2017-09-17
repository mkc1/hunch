import React from 'react';
import Username from './Components/Username';
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
                <Username />
                {(!this.state.username) &&
                    <ChooseGame username={this.state.username} />
                }
            </div>
        )
    };
}

export default Application;