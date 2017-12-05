import React from 'react';
import Form from './Components/Form';
import ChooseGame from './Components/ChooseGame';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addUsername } from './actions';


class Application extends React.Component {

    render() {
        return(
            <div>
                <div className='welcome-message'>
                    {(this.props.username) &&
                        (<h2>Welcome {this.props.username ? ` ${this.props.username}` : ''}!</h2>)
                    }
                </div>
                <div>
                    {(!this.props.username) ?
                        <div>
                        <div>
                            <span>Enter your name to get started</span>
                        </div>
                        <Form className='panel' liftData={
                            (name)=>this.props.addUsername(name)
                        } />
                        </div>
                    :
                        <ChooseGame username={this.props.user} />
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.username
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addUsername }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
