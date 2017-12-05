import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addAnswer } from './../actions';
import Form from './Form.js';

class SubmitAnswer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            unansweredUsers: [],
            submitted: false
        };

        this.showTopic = this.showTopic.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.showUnansweredUsers = this.showUnansweredUsers.bind(this);
    }

    componentWillMount() {
        let unansweredUsers = this.props.users.map(user =>{
            return {id: user._id, name: user.name};
        });

        this.setState({unansweredUsers: [].concat(unansweredUsers)});
    }

    componentWillReceiveProps(nextProps) {
        let data = [];

        // find the users that have submitted an answer
        let answeredUsers = nextProps.answers.map(answer=> {
            return answer.user;
        });

        console.log('answered')

        // find the users that haven't submitted an answer
        nextProps.users.forEach(user=> {
            if (answeredUsers.indexOf(user._id)===-1) {
                data.push({id: user._id, name: user.name});
            }
        });

        // if everyone has submitted, redirect everyone to selections
        if (data.length<1) {
            this.props.history.push('/selections');
        }

        this.setState({unansweredUsers: [].concat(data)});
    }

    showTopic() {
        let topic = this.props.game.topics[this.props.game.round-1].topic;
        return (<div className='topic-title'>{topic}</div>);
    }

    showUnansweredUsers() {
        return this.state.unansweredUsers.map(user=> {
            return user.name;
        });
    }

    submitAnswer(answer) {
        let username = this.props.username;
        this.props.addAnswer(answer, username, this.props.game._id);
        this.setState({submitted: true});
    }

    render() {
        const username = this.props.user;
        return(
            <div className='panel'>
                <div>Round {this.props.game.round}
                </div>
                <div className='topic'>
                    {this.showTopic()}
                </div>
                <div>Waiting on:
                    {this.showUnansweredUsers()}
                </div>
                {(this.state.submitted) ?
                    (<div>Thanks for submitting!</div>)
                    :
                    (<Form liftData={this.submitAnswer}/>)
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('state', state);
    return {
        game: state.game,
        users: state.game.users,
        answers: state.game.answers,
        username: state.username
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addAnswer }, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitAnswer));
