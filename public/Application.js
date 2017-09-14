import React from 'react';

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        axios.get('')
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