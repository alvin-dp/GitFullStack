
import React from 'react';

class ClassCounter extends React.Component {

    state   = {count: 0};
    increment = () => {
        this.setState({
        count: this.state.count + 1
        });
    };

    decrement = () => {
        this.setState({
        count: this.state.count - 1
        });
    };

    render() {
        return (
        <div style={{backgroundColor:'indigo'}}>
            Class Counter {this.props.name}: {this.state.count}
            <p>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </p>
        </div>
        );
    }
}

export default ClassCounter