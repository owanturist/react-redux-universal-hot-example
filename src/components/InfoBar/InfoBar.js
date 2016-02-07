import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { load } from 'actions/info';

@connect(
    state => ({
        info: state.info.data
    }), {
        load
    }
)
export default class InfoBar extends Component {
    static propTypes = {
        info: PropTypes.object,
        load: PropTypes.func.isRequired
    }

    render() {
        const { info } = this.props;

        return (
            <div className={' well'}>
                <div className="container">
                    This is an info bar
                    {' '}
                    <strong>{info ? info.message : 'no info!'}</strong>
                    <span>{info && new Date(info.time).toString()}</span>
                    <button className="btn btn-primary" onClick={this.props.load}>Reload from server</button>
                </div>
            </div>
        );
    }
}
