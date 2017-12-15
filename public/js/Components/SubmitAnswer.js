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
        this.findUnansweredUsers = this.findUnansweredUsers.bind(this);
        this.showUnansweredUsers = this.showUnansweredUsers.bind(this);
    }

    componentWillMount() {
        this.findUnansweredUsers(this.props);
        // let submitted = false;
        // console.log('props!!!', this.props)

        // this.props.game.answer.forEach(user =>{
        //     if (answer.user===this.props.username) {
        //         submitted = true;
        //     }
        // })
        // let unansweredUsers = this.props.users.map(user =>{
        //     return {id: user._id, name: user.name};
        // });

        // this.setState({unansweredUsers: [].concat(unansweredUsers), submitted: submitted});
    }

    componentWillReceiveProps(nextProps) {
        this.findUnansweredUsers(nextProps);
    }

    showTopic() {
        let topic = this.props.game.topics[this.props.game.round-1].topic;
        return (<div className='topic-title'>{topic}</div>);
    }

    findUnansweredUsers(props){
        let data = [];
        let submitted = false;

        // find the users that have submitted an answer
        let answeredUsers = props.answers.map(answer=> {
            // hack for if the user presses the back button and submits again
            if (answer.user===props.username) {
                submitted = true;
            }
            return answer.user;
        });

        // find the users that haven't submitted an answer
        props.users.forEach(user=> {
            if (answeredUsers.indexOf(user._id)===-1) {
                data.push({id: user._id, name: user.name});
            }
        });

        // if everyone has submitted, redirect everyone to selections
        if (data.length<1) {
            this.props.history.push('/selections');
        }
        this.setState({unansweredUsers: [].concat(data), submitted: submitted});
    }

    showUnansweredUsers() {
        return this.state.unansweredUsers.map(user=> {
            return (<li className='user-list-item'>{user.name}</li>);
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
            <div className='panel' id='answer-panel'>
                <div className='panel-header'>
                    <div id='round-container'>
                        Round {this.props.game.round}
                    </div>
                    <div id='waiting-on-container'>
                        <label>waiting on:</label>
                        <ul className='user-list'>
                            {this.showUnansweredUsers()}
                        </ul>
                    </div>
                </div>
                <div className='topic'>
                    {this.showTopic()}
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
