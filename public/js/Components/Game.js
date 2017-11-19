import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addAnswer } from './../actions';
import Form from './Form.js';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            unansweredUsers: []
        };

        this.nextTopic = this.nextTopic.bind(this);
        this.showTopic = this.showTopic.bind(this);
        this.showUnansweredUsers = this.showUnansweredUsers.bind(this);
    }

    // submitAnswer(answer) {
    //     console.log('props', this.props)
    //     console.log('adding this answer', answer);
    //     this.props.addAnswer(answer);
    // }

    componentWillMount() {
        let unansweredUsers = this.props.users.map(user =>{
            return {id: user._id, name: user.name};
        })

        this.setState({unansweredUsers: [].concat(unansweredUsers)}, ()=>{
            console.log('ssgsge', this.state.unansweredUsers);
        })
    }

    componentWillReceiveProps(nextProps) {
        let data = [];

        let answeredUsers = nextProps.answers.map(answer=> {
            return answer.user;
        })

        nextProps.users.forEach(user=> {
            console.log('user', user)
            console.log('ay', answeredUsers.indexOf(user._id))
            if (answeredUsers.indexOf(user._id)===-1) {
                data.push({id: user._id, name: user.name});
            }
        })

        if (data.length<1) {
            this.props.history.push('/selections');
        }

        this.setState({unansweredUsers: [].concat(data)}, ()=>{
            console.log(this.state.unansweredUsers)
        })
    }

    nextTopic() {
        console.log('next topic');
    }

    showTopic() {
        let topic = this.props.game.topics[this.props.game.round].topic;
        return (<div className='topic-title'>{topic}</div>);
    }

    // showAnswers() {
    //     return this.props.answers.map((i)=>{
    //         return this.props.answers[i].name
    //     });
    // }

    showUnansweredUsers() {

        // let answeredUsers = this.props.answers.map(answer =>{
        //     if (answer.user===)
        // })
        // let unansweredUsers = this.props.answers(answer=> {
        //     return answer
        // })

        return this.state.unansweredUsers.map(user=> {
            return user.name;
        });
    }

    render() {
        const username = this.props.location.state.user;
        console.log('props from game', this.props);
        return(
                <div className='panel'>
                    <div>Round:
                        {this.props.game.round}
                    </div>
                    <div>Topic:
                        {this.showTopic()}
                    </div>
                    <div>Waiting on:
                        {this.showUnansweredUsers()}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
