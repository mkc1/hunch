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
        this.props.liftData(this.state.input);
        e.preventDefault();
        return;
    }

    render() {
        return(
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input type="text" name="name" onChange={this.handleInput} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
        );
    }
}

export default Form;
