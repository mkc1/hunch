import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        console.log(this.props.location);
        return(<div>hellooooo!!!!</div>)
    }
}

export default Game;