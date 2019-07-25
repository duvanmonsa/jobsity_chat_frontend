import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Input, Tag } from 'antd';
import socketIOClient from "socket.io-client";

import chatroomActions from '../redux/chatroom/actions';
import { getToken } from '../utils/utility';


const { getRoomMessages, addMessage } = chatroomActions;
const { idToken } = getToken();
const socket = socketIOClient('localhost:4000', {
  extraHeaders: {
    'Authorization': `Bearer ${idToken}`
  }
});

export class CurrentRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: '',
      sending: false
    };
  }
  componentDidMount() {
    this.props.getRoomMessages(this.props.match.params.id).then(() => {
      this.setState({ loading: false });
    }).catch(err => {
      this.setState({ loading: false });
    });
    // get new message
    socket.on("new_message", this.props.addMessage);
  }
  renderMessage = (message) => {
    return <div key={message.id} className="message-item"><Tag>{message.User.name}</Tag> {message.text} </div>
  }
  sendMessage = () => {
    socket.emit('message', { chatroomId: this.props.match.params.id, text: this.state.message, tokenId: `Bearer ${idToken}` })
    this.setState({ message: '' });

  }

  componentWillUnmount = () => {
    socket.off("message");
    socket.off("new_message");
  }

  render() {
    if (this.state.loading) {
      return <Spin />
    }
    return <div className="messages">
      {this.props.currentRoom.messages.map((message) => {
        return this.renderMessage(message);
      })}
      <Input value={this.state.message} placeholder="Type..." onChange={(e) => {
        this.setState({ message: e.target.value })
      }} />
      <Button type="primary" onClick={this.sendMessage} loading={this.state.sending}>Send Message</Button>
    </div>
  }
}

export default connect(
  state => ({
    currentRoom: state.ChatRoom.currentRoom
  }),
  { getRoomMessages, addMessage }
)(CurrentRoom);
