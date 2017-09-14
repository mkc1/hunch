import React from 'react';

class Application extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <div>
                <h2>Click <button>here</button> to start a new game!</h2>
            </div>
        )
    }
}

export default Application;