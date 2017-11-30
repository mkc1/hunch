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
            users: [{name: 'user one'}, {name: 'second user'}, {name: 'number three user'}, {name: 'a fourth user'}],
            answers: [{text: 'fake answer'}, {text: 'pseudo answer'}, {text: 'not a real answer'}, {text: 'answer?!?!!?'}],
            selections: []
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
                console.log('checking', answer.selections.length, nextProps.users.length)
                receivedSelections = false;
            };
        });
        if (receivedSelections===true) {
            console.log('going to results');
            this.props.history.push('/results');
        }
    }

    // submitAnswer(answer) {
    //     console.log('props', this.props)
    //     console.log('adding this answer', answer);
    //     this.props.addAnswer(answer);
    // }

    //drag stuff
    dragStart(e, user) {
        console.log('dragging', e, user);


        // let data = arguments[0];

        // console.log('data', user, 'td', e.dataTransfer);

        e.dataTransfer.setData('user', JSON.stringify(user)); 
    }

    //drop stuff
    preventDefault(e) {
        e.preventDefault();
    }

    drop(e, answer) {
        e.preventDefault();


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
        let display;
        return this.props.answers.map(function(answer){
            let selection = self.state.selections.find((element)=>element[answer.answer]) || null;
            if (selection) display = selection[answer.answer];
            else display = "";
            return (
                <div style={{margin: '20px'}}>
                    <div
                        onDragOver={self.preventDefault}
                        onDrop={e => self.drop(e, answer) }
                        style={{padding: '20px', background: "#809fff"}}
                        key={answer.answer}
                    >{answer.answer}
                    </div>
                    <div style={{ color: 'black' }}>{display}</div>
                    {display.length > 0 &&
                    <button onClick={self.removeSelection.bind(null, selection)}>x</button>
                    }
                </div>
            )
        })
    }

    addSelection(user, answer) {

        // const newData = update(myData, {
        //   x: {y: {z: {$set: 7}}},
        //   a: {b: {$push: [9]}}
        // });
        let selection = {};

        // this.state.selections.forEach(selection=>{
        //     if (!selection[answer]) selection[answer] = user;
        //     this.setState({selections: this.state.selections.concat([selection])})
        // })

        // let updatedSelections;

        // handleCommentEdit: function(id, text) {
        // var data = this.state.data;
        // var commentIndex = data.findIndex(function(c) { 
        //     return c.id == id; 
        // });

        // var updatedComment = update(data[commentIndex], {text: {$set: text}}); 

        // var newData = update(data, {
        //     $splice: [[commentIndex, 1, updatedComment]]
        // });
        // this.setState({data: newData});

        let newSelections;
        let existingSelection = this.state.selections.find((element)=>element[answer.answer]);

        if (!existingSelection) {
            console.log('didnt find it!');
            selection[String(answer.answer)] = user.name;
            console.log('selection', selection);
            newSelections = this.state.selections.concat([selection]);
        } else {
            console.log('found it!')
            this.state.selections.indexOf(existingSelection);
            let updatedSelection = update(existingSelection, {[answer.answer]: {$set: user.name}});

            newSelections = update(this.state.selections, {
                $splice: [[this.state.selections.indexOf(existingSelection), 1, updatedSelection]]
            })

        }

        console.log('new', newSelections);

        this.setState({selections: newSelections}, function(){
            console.log('updated!!!!', this.state.selections)
        });

        // if (!this.state.selections.find((element)=>element[answer.text])) {
        //     console.log('didn find it!')
        //     selection[answer.text] = user.name;
        //     console.log(selection)
        //     updatedSelections = this.state.selections.concat([selection]);
        // } else {
        //     console.log('DID find it!', answer.text)
        //     updatedSelections = update(this.state.selections.find((element)=>element[answer.text]),
        //     {
        //         [answer.text]: {$set: user.name}
        //     })
        // }

        // console.log('updatedSelections', updatedSelections.length)

        // this.setState({selections: updatedSelections}, ()=>
        //     {console.log('updated!', this.state.selections)})

    }

    removeSelection(selection) {
        console.log('ans', selection);
        this.state.selections.find(selection=>{
            console.log('found it', Object.values(selection))
        })
        const index = this.state.selections.indexOf(selection);
        let user = Object.values(selection)[0];
        const newSelections = update(this.state.selections, {$splice: [[index, 1]]});

        console.log('new?', newSelections, user);

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

        this.props.addSelections(selections, this.props.user, this.props.game._id)
    }

    render() {
        return(
                <div>
                    <div>
                        <div style={{float: "left", color: "white"}}>
                            {this.showUsers()}
                        </div>
                        <div style={{float: "right", color: "white"}}>
                            {this.showAnswers()}
                        </div>
                    </div>
                    <button onClick={this.submitSelections}>Submit</button>
                </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('state also', state);
    console.log('game??pls', state.game);
    return {
        game: state.game,
        answers: state.game.answers,
        users: state.game.users,
        user: state.user
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addSelections}, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Selections));
