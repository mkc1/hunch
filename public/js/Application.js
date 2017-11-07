import React from 'react';
import Form from './Components/Form';
import ChooseGame from './Components/ChooseGame';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addUsername } from './actions';

class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('application', this.props.user);

        return(
            <div>
                <div className='logo-container'>
                    <h2 className='logo'>Hunch</h2>
                </div>
                <div className='main-container'>
                    <div>
                        <h2>Welcome{this.props.user ? ` ${this.props.user}` : ''}!</h2>
                    </div>
                    <div>
                        {(!this.props.user) ? 
                            <Form liftData={
                                (name)=>this.props.addUsername(name)
                            } />
                        :
                            <ChooseGame username={this.props.user} />
                        }
                    </div>
                </div>
                <p className='footer'>Created by Meredith Coulis, 2017</p>
            </div>
        )
    };
}

function mapStateToProps(state) {
    console.log('ze state', state)
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addUsername }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
