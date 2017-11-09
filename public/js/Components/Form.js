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
        this.props.liftData(this.state.input);
        return;
    }

    render() {
        return(
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label className='name-label'>{this.props.formLabel}</label>
                            <input className='name-input' type='text' name='name' onChange={this.handleInput} />
                        <button className='submit-btn' type='submit'>Submit</button>
                    </form>
                </div>
        );
    }
}

export default Form;
