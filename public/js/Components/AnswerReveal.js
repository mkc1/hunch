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
            currentAnswer: 0,
            test: true
        };

        this.showSelections = this.showSelections.bind(this);
        this.showAnswers = this.showAnswers.bind(this);
        this.nextAnswer = this.nextAnswer.bind(this);
        this.nextTopic = this.nextTopic.bind(this);
        this.testing = this.testing.bind(this);
    }

    showSelections(){
        console.log('show selections');
        let currentSelections = this.props.game.answers[this.state.currentAnswer].selections;
        console.log('aflje', currentSelections);

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
        console.log('show answers');
        let currentAnswer = this.props.game.answers[this.state.currentAnswer];
        let userDisplay = this.props.game.users.find(user=>{
            return user._id===currentAnswer.user;
        }).name;
            return(
                <div>
                    <div>" {currentAnswer.answer} "</div>
                    <div>{userDisplay}</div>
                    <button onClick={this.nextAnswer}>next</button>
                </div>
            )
    }

    nextAnswer(){
        let updatedPoints = Object.assign({}, this.state.currentPoints);

        this.props.game.users.forEach(user =>{
            if (!updatedPoints[user._id]) updatedPoints[user._id] = 0;
        })

        let currentAnswer = this.props.game.answers[this.state.currentAnswer];
        currentAnswer.selections.forEach(selection => {
            if (selection.correct) {
                updatedPoints[selection.guessing_user]++;
            }
        })

        this.setState({currentPoints: updatedPoints}, ()=>{
            console.log('it updated', this.state.currentPoints);
            let nextAnswer = this.state.currentAnswer + 1;
            if (nextAnswer>this.props.game.answers.length-1) {
                console.log('now we shoudl be calling next')
                this.nextTopic();
                return;
            }
            this.setState({currentAnswer: nextAnswer}, ()=>{
                console.log('currentAnsw', nextAnswer, this.state.currentAnswer)
            });
        })
    }

    nextTopic() {
        console.log('next topic');
        if (this.props.game.round===this.props.game.topics.length) {
            console.log('end of game', this.state.currentPoints);
            this.props.history.push('/end-game');
        } else {
            this.props.nextTopic(this.props.game._id);
            this.props.history.push('/game');
        }
    }

    testing() {
        console.log('testing');
        this.props.history.push('/game');
    }

    render() {
        return(
            <div>
                <div>
                    {this.showAnswers()}
                </div>
                <div>
                    selections: {this.showSelections()}
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
