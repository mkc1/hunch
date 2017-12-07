import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { endOfGame, nextTopic } from './../actions';

class AnswerReveal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPoints: {},
            currentAnswerIdx: 0
        };

        this.showSelections = this.showSelections.bind(this);
        this.showAnswers = this.showAnswers.bind(this);
        this.nextAnswer = this.nextAnswer.bind(this);
        this.nextTopic = this.nextTopic.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log('answers cleared for new round, begin new round');
        if (!nextProps.answers.length) this.props.history.push('/game');
    }

    showSelections(){
        let currentSelections = this.props.game.answers[this.state.currentAnswerIdx].selections;

        return currentSelections.map(selection=>{
            let guesser = this.props.game.users.find(user=>{
                return selection.guessing_user===user._id
            }).name;
            let user = this.props.game.users.find(user=>{
                return selection.suspected_user===user._id
            }).name;
            let points = selection.correct ? 1 : 0;
            return(
                <div style={{padding: '10px'}}>
                    <div>guesser: {guesser}</div>
                    <div>user: {user}</div>
                    <div>correct: {selection.correct.toString()}</div>
                    <div>points awarded: {points}</div>
                </div>
            )
        })
    }

    showAnswers(){
        let currentAnswer = this.props.game.answers[this.state.currentAnswerIdx];
        let userDisplay = this.props.game.users.find(user=>{
            return user._id===currentAnswer.user;
        }).name;
            return(
                <div>
                    <div>" {currentAnswer.answer} "</div>
                    <div>{userDisplay}</div>
                </div>
            )
    }

    nextAnswer(){
        let updatedPoints = Object.assign({}, this.state.currentPoints);

        this.props.game.users.forEach(user =>{
            if (!updatedPoints[user._id]) updatedPoints[user._id] = 0;
        })

        let currentAnswer = this.props.game.answers[this.state.currentAnswerIdx];
        currentAnswer.selections.forEach(selection => {
            if (selection.correct) {
                updatedPoints[selection.guessing_user]++;
            }
        })

        this.setState({currentPoints: updatedPoints}, ()=>{
            let nextAnswer = this.state.currentAnswerIdx + 1;
            if (nextAnswer>this.props.game.answers.length-1) {
                this.nextTopic();
                return;
            }
            this.setState({currentAnswer: nextAnswer}, ()=>{
                console.log('currentAnswer', nextAnswer, this.state.currentAnswerIdx)
            });
        })
    }

    nextTopic() {
        if (this.props.game.round===this.props.game.topics.length) {
            console.log('end of game', this.state.currentPoints);
            this.props.nextTopic(this.props.game._id);
            this.props.history.push('/end-game');
        } else {
            this.props.nextTopic(this.props.game._id);
        }
    }

    render() {
        return(
            <div>
                <div>
                    {this.showAnswers()}
                </div>
                <div className='selection-reveal-container'>
                    {this.showSelections()}
                </div>
                <div>
                    <button onClick={this.nextAnswer}>next</button>
                </div>
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
    return bindActionCreators({endOfGame, nextTopic}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnswerReveal));
