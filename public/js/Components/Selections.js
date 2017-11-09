import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Selections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            round: 1
        };

        this.nextTopic = this.nextTopic.bind(this);
        this.showTopic = this.showTopic.bind(this);
    }

    // submitAnswer(answer) {
    //     console.log('props', this.props)
    //     console.log('adding this answer', answer);
    //     this.props.addAnswer(answer);
    // }

    nextTopic() {
        console.log('next topic');
    }

    showTopic() {
        let topic = this.props.game.topics[0].topic;
        return topic;
    }

    showAnswers() {
        return this.props.answers;
    }

    render() {
        const username = this.props.location.state.user;
        console.log('props from game', this.props);
        return(
                <div>
                    <div>
                        {this.showTopic()}
                    </div>
                    <div>
                        {this.showAnswers()}
                    </div>
                        <Form liftData={(answer)=>this.props.addAnswer(answer, username, this.props.game._id)}/>
                </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('state also', state);
    console.log('game??pls', state.game);
    return {
        game: state.game,
        users: state.game.users,
        answers: state.game.answers
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addAnswer }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Selections);
