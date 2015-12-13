import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import DocumentMeta from 'react-document-meta';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { InfoBar } from 'components';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';
import styles from './App.css';
import cssModules from 'react-css-modules';

function fetchData(getState, dispatch) {
  const promises = [];
  if (!isInfoLoaded(getState())) {
    promises.push(dispatch(loadInfo()));
  }
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState})
@cssModules(styles)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, '/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const {user} = this.props;

    return (
      <div styleName='root'>
        <DocumentMeta {...config.app}/>
        <div fixedTop toggleNavKey={0}>
          <div>
            <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
              <span>{config.app.title}</span>
            </IndexLink>
          </div>

          <div eventKey={0}>
            <div navbar>
              <Link to="/chat">
                <div eventKey={1}>Chat</div>
              </Link>

              <Link to="/widgets">
                <div eventKey={2}>Widgets</div>
              </Link>
              <Link to="/survey">
                <div eventKey={3}>Survey</div>
              </Link>
              <Link to="/about">
                <div eventKey={4}>About Us</div>
              </Link>

              {!user &&
              <Link to="/login">
                <div eventKey={5}>Login</div>
              </Link>}
              {user &&
              <Link to="/logout">
                <div eventKey={6} className="logout-link" onClick={this.handleLogout}>
                  Logout
                </div>
              </Link>}
            </div>
            {user &&
            <p className={' navbar-text'}>Logged in as <strong>{user.name}</strong>.</p>}
            <div navbar right>
              <div eventKey={1} target="_blank" title="View on Github" href="https://github.com/erikras/react-redux-universal-hot-example">
                <i className="fa fa-github"/>
              </div>
            </div>
          </div>
        </div>

        <div >
          {this.props.children}
        </div>
        <InfoBar/>

        <div className="well text-center">
          Have questions? Ask for help <a
          href="https://github.com/erikras/react-redux-universal-hot-example/issues"
          target="_blank">on Github</a> or in the <a
          href="https://discord.gg/0ZcbPKXt5bZZb1Ko" target="_blank">#react-redux-universal</a> Discord channel.
        </div>
      </div>
    );
  }
}
