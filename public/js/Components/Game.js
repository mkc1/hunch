import React from 'react';
import { Redirect, Link } from 'react-router-dom';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            round: 1
        };

        this.game = this.props.location.state.game;
        this.players = this.game.users;
        this.topics = this.game.topics;

        this.showTopic = this.showTopic.bind(this);
    }

    showTopic(){
        return this.topics.map(topic=>{
            console.log(topic);
            return topic.topic;
        })
    }

    render() {
        return(
                <div>
                    {round}
                    {this.showTopic()}
                    }
                </div>
        );
    }
}

export default Game;