import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { messageReceived } from 'actions';

@connect(
  state => ({
      user: state.auth.user,
      chat: state.chat
  })
)
export default class Chat extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  state = {
    messages: []
  };

  componentDidMount() {
      const { dispatch } = this.props;

    if (socket && !this.onMsgListener) {
      this.onMsgListener = socket.on('msg', data => dispatch(messageReceived(data)));

        socket.emit('history', {offset: 0, length: 100});
    }
  }

  componentWillUnmount() {
    if (socket && this.onMsgListener) {
      socket.removeListener('on', this.onMsgListener);
      this.onMsgListener = null;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { message } = this.refs;

    socket.emit('msg', {
      from: this.props.user.name,
      text: message.value
    });

    message.value = '';
  }

  render() {

    const {user, chat} = this.props;

    return (
      <div className={' container'}>
        <h1>Chat</h1>

        {user &&
        <div>
          <ul>
          {chat.map((msg, key) =>
             <li key={key}>{msg.from}: {msg.text}</li>
          )}
          </ul>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input type="text" ref="message" placeholder="Enter your message"/>
            <button type="submit">Send</button>
          </form>
        </div>
        }
      </div>
    );
  }
}
