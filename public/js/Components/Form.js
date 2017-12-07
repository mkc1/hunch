import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ''
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        this.setState({ input: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        document.getElementById('submit-btn').disabled = true;
        this.props.liftData(this.state.input);
        return;
    }

    render() {
        return(
                <div className='form-container'>
                    <form onSubmit={this.handleSubmit}>
                    {(this.props.formLabel) && 
                        <label className='label'>{this.props.formLabel}</label>
                    }
                        <input className='input' type='text' onChange={this.handleInput} />
                        <button className='submit-btn' id='submit-btn' type='submit'>submit</button>
                    </form>
                </div>
        );
    }
}

export default Form;
