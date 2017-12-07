import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from './Form';
import ChooseGame from './ChooseGame';
import { addUsername } from './../actions';


class Home extends React.Component {

    render() {
        return(
            <div>
                {(!this.props.username) ?
                    <div className='panel'>
                        <div>
                            <span>Enter your name to get started</span>
                        </div>
                        <Form liftData={
                            (name)=>this.props.addUsername(name)
                        } />
                    </div>
                :
                <ChooseGame username={this.props.user} />
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
