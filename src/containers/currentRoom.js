import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Spin, Button, Input, Tag } from 'antd';
import socketIOClient from "socket.io-client";

import chatroomActions from '../redux/chatroom/actions';

const { getRoomMessages, addMessage } = chatroomActions;
const socket = socketIOClient('localhost:4000');

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
    return <div key={message.id} className="message-item"><Tag color="purple">{message.User.name}</Tag> {message.text} </div>
  }

  componentWillUnmount = () => {
    socket.off("message");
    socket.off("new_message");
  }
  sendMessage = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        socket.emit('message', { chatroomId: this.props.match.params.id, text: values.message, tokenId: `Bearer ${this.props.auth.idToken}` })
        this.props.form.resetFields();

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.loading) {
      return <Spin />
    }
    return <div className="messages">
      {this.props.currentRoom.messages.map((message) => {
        return this.renderMessage(message);
      })}

      <Form onSubmit={this.sendMessage}>
        <Form.Item className="isoInputWrapper">
          {getFieldDecorator('message', {
            rules: [
              {
                required: true,
                message: "Set the message"
              }
            ]
          })(
            <Input value={this.state.message} placeholder="Type..." />
          )}
        </Form.Item>
        {/* <Input value={this.state.message} placeholder="Type..." onChange={(e) => {
        this.setState({ message: e.target.value })
      }} /> */}
        <div className="isoInputWrapper isoLeftRightComponent">
          <Button type="primary" htmlType="submit" loading={this.state.sending}>
            Send Message
                </Button>
        </div>
      </Form>
    </div >
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    currentRoom: state.ChatRoom.currentRoom
  }),
  { getRoomMessages, addMessage }
)(Form.create()(CurrentRoom));
