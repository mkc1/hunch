import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class AnswerReveal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPoints: {};
        };

        this.showSelections = this.showSelections.bind(this);
        this.showAnswers = this.showAnswers.bind(this);
        this.nextAnswer = this.nextAnswer.bind(this);
    }

    showSelections(){
        let currentSelections = this.props.game.answers[this.state.currentAnswer].selections;
        console.log('aflje', currentSelections)
        return currentSelections.map(selection=>{
            return(
                <div>
                    <div>guesser: {selection.guessing_user}</div>
                    <div>user: {selection.suspected_user}</div>
                    <div>correct: {selection.correct.toString()}</div>
                </div>
            )
        })
    }

    showAnswers(){
        let currentAnswer = this.props.game.answers[this.state.currentAnswer];
            return(
                <div>
                    <div>{currentAnswer.answer}</div>
                    <div>selections: {this.showSelections()}</div>
                    <div>{currentAnswer.user}</div>
                    <button onClick={this.nextAnswer()}>next</button>
                </div>
            )
    }

    nextAnswer(){
        let nextAnswer = this.state.currentAnswer++;
        if (nextAnswer>this.props.game.answers.length-1) {
            this.nextTopic();
            return;
        }
        this.setState({currentAnswer: nextAnswer});
    }

    nextTopic() {
        if (this.props.game.round===this.props.game.topics.length) {
            this.props.endOfRound(this.props.game._id, this.state.currentPoints);
        } else {
            this.props.endOfRound(this.props.game._id, this.state.currentPoints);
        }
    }

    render() {
        return(
            <div>
                {this.showAnswers()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('state also', state.game);
    return {
        game: state.game,
        answers: state.game.answers
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnswerReveal));
