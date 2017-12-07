import React from 'react';
// import socket from './../socket.js'
import { Redirect, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class EndGame extends React.Component {
    constructor(props) {
        super(props);

        this.showWinningUser = this.showWinningUser.bind(this);
        this.playAgain = this.playAgain.bind(this);
    }

    showWinningUser() {
        // let winningUser = null;
        // this.props.users.forEach(user =>{
        //     if (!winningUser) winningUser = user;
        //     else if (user.points>winningUser.points) winningUser = user;
        // });
        return (<div>aest</div>)
    }

    playAgain() {
        this.props.history.push('/');
    }

    render() {
        return(
            <div>
                {this.showWinningUser()}
                <button className='submit-btn-main' onClick={this.playAgain}>Play Again?</button>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        // users: state.game.users
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EndGame));
