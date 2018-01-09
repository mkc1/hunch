import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { addSelections } from './../actions';

class Selections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selections: [],
            submitted: false
        };

        this.showUsers = this.showUsers.bind(this);
        this.showAnswers = this.showAnswers.bind(this);
        this.preventDefault = this.preventDefault.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.drop = this.drop.bind(this);
        this.removeSelection = this.removeSelection.bind(this);
        this.submitSelections = this.submitSelections.bind(this);
    }

    componentWillReceiveProps(nextProps){
        let receivedSelections = true;
        nextProps.answers.forEach(answer=> {
            if (answer.selections.length!==nextProps.users.length) {
                receivedSelections = false;
            }
        });
        if (receivedSelections===true) {
            this.props.history.push('/results');
        }
    }

    //drag stuff
    dragStart(e, user) {
        e.dataTransfer.setData('user', JSON.stringify(user)); 
    }

    //drop stuff
    preventDefault(e) {
        e.preventDefault();
    }

    drop(e, answer) {
        e.preventDefault();
        //this turns the box green
        // e.target.parentElement.classList.add('matched');

        let user = JSON.parse(e.dataTransfer.getData('user'));
        this.addSelection(user, answer);
        console.log('dropped data', user, answer);
        document.getElementById(user.name).draggable = false;

    }

    showUsers() {
        let self = this;
        return this.props.users.map(function(user){
            return (
                <div
                    key={user.name}
                    id={user.name}
                    draggable={true}
                    className="user-box"
                    onDragStart={(e) => self.dragStart(e, user) }
                >{user.name}</div>
            )
        })
    }

    showAnswers() {
        let self = this;
        let user_display;
        return this.props.answers.map(function(answer){
            let selection = self.state.selections.find((element)=>element[answer.answer]) || null;
            // if it's been matched, show the suspected user below the answer
            if (selection) user_display = selection[answer.answer];
            else user_display = "";
            return (
                <div className='answer-box'
                    onDragOver={self.preventDefault}
                    onDrop={e => self.drop(e, answer)}>
                    <div className='answer-display'
                        key={answer.answer}
                        >
                        {answer.answer}
                    </div>
                    <div className='user-display'>
                        {user_display}
                        {user_display.length>0 &&
                            <button className='delete-btn' onClick={e => self.removeSelection.apply(null, [selection, e])}>x</button>
                        }
                    </div>
                </div>
            )
        })
    }

    addSelection(user, answer) {
        let selection = {};
        let newSelections;
        let existingSelection = this.state.selections.find((selection)=>selection[answer.answer]);

        if (!existingSelection) {
            console.log('it doesnt exist');
            selection[String(answer.answer)] = user.name;
            newSelections = this.state.selections.concat([selection]);
        } else {
            console.log('it exists');
            let updatedSelection = update(existingSelection, {[answer.answer]: {$set: user.name}});

            newSelections = update(this.state.selections, {
                $splice: [[this.state.selections.indexOf(existingSelection), 1, updatedSelection]]
            })

        }
        this.setState({selections: newSelections}, function(){
            console.log('updated', this.state.selections)
        });
    }

    removeSelection(selection, e) {
        // turns box back to red
        e.target.parentElement.parentElement.classList.remove('matched');

        this.state.selections.find(selection=>{
            console.log('found selection in state', Object.values(selection))
        })
        const index = this.state.selections.indexOf(selection);
        let user = Object.values(selection)[0];
        const newSelections = update(this.state.selections, {$splice: [[index, 1]]});

        this.setState({selections: newSelections}, ()=>{
            document.getElementById(user).draggable = true;
        });
    }

    submitSelections(e) {
        e.preventDefault();

        const selections = {};
        const self = this;
        
        this.state.selections.forEach(selection =>{
            self.props.answers.forEach(answer =>{
                if (answer.answer===Object.keys(selection)[0]) {
                    selections[answer._id] = selection[answer.answer];
                }
            });
        })
        console.log('submitted selections', selections);
        e.target.disabled = true;
        this.props.addSelections(selections, this.props.username, this.props.game._id);
        this.setState({submitted: true});
    }

    render() {
        return(
                <div>
                    <div className='selection-container'>
                        <div className='selections user-container'>
                            {this.showUsers()}
                        </div>
                        <div className='selections answer-container'>
                            {this.showAnswers()}
                        </div>
                    </div>
                    {(!this.state.submitted) ?
                        (<button className='submit-btn' onClick={this.submitSelections}>Submit</button>)
                         :
                         (<p>Thanks for submitting! Waiting on other players...</p>)
                    }
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        game: state.game,
        answers: state.game.answers,
        users: state.game.users,
        username: state.username
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addSelections}, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Selections));
