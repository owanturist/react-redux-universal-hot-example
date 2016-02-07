import React, { Component, PropTypes } from 'react';
import { connectMultireducer } from 'multireducer';
import { increment } from 'actions/counter';

@connectMultireducer(
    state => ({
        count: state.count
    }), {
        increment
    }
)
export default class CounterButton extends Component {
    static propTypes = {
        count: PropTypes.number,
        increment: PropTypes.func.isRequired
    }

    render() {
        const { count } = this.props;
        return (
            <button onClick={this.props.increment}>
                You have clicked me {count} time{count === 1 ? '' : 's'}.
            </button>
        );
    }
}
