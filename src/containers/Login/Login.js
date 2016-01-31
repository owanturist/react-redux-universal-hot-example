import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'reducers/auth';
import config from '../../config';

import { login as loginFetch } from 'actions/auth';

@connect(
  state => ({user: state.auth.user}),
  {...authActions, loginFetch})
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    loginFetch: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  handleSubmitFetch = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.loginFetch(input.value);
    input.value = '';
  }

  render() {
    const {user, logout} = this.props;

    return (
      <div className={' container'}>
        <DocumentMeta title={config.app.title + ': Login'}/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
            <button className="btn btn-success" onClick={this.handleSubmitFetch}><i className="fa fa-sign-in"/>{' '}Log In Fetch
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
