import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addAnswer } from './../actions';
import Form from './Form.js';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            round: 1
        };

        this.nextTopic = this.nextTopic.bind(this);
        this.showTopic = this.showTopic.bind(this);
    }

    submitAnswer(answer) {
        this.props.addAnswer(answer, this.props.user, this.props.game._id);
    }

    nextTopic() {
        console.log('next topic');
    }

    showTopic() {
        let topic = this.props.game.topics[this.props.game.round-1].topic;
        return topic;
    }

    render() {
        console.log('props from game', this.props);
        return(
                <div>
                    <div>
                        {this.showTopic()}
                    </div>
                        <Form liftData={this.submitAnswer}/>
                </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('state also', state);
    console.log('game??pls', state.game);
    return {
        user: state.user,
        game: state.game
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addAnswer: addAnswer }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
