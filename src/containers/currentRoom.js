import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Input } from 'antd';

import chatroomActions from '../redux/chatroom/actions';


const { getRoomMessages } = chatroomActions;

export class CurrentRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    this.props.getRoomMessages(this.props.id).then(() => {
      this.setState({ loading: false });
    }).catch(err => {
      this.setState({ loading: false });
    });
  }
  renderMessage = (message) => {
    return <div key={message.id} className="message-item"><span>{message.User.name}</span> {message.text} </div>
  }

  render() {
    if (this.state.loading) {
      return <Spin />
    }
    return <div className="messages">
      {this.props.messages.map((message) => {
        return this.renderMessage(message);
      })}
      <Input placeholder="Type..." />
      <Button onClick={this.props.back}>Back</Button>
    </div>
  }
}

export default connect(
  state => ({
    messages: state.ChatRoom.currentRoom.messages
  }),
  { getRoomMessages }
)(CurrentRoom);
