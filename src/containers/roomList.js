import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button } from 'antd';
import { Link } from "react-router-dom";

import chatroomActions from '../redux/chatroom/actions';
import CurrentRoom from './currentRoom';

import './chatroom.scss';

const { getRooms } = chatroomActions;

export class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    this.props.getRooms().then(() => {
      this.setState({ loading: false });
    }).catch(err => {
      this.setState({ loading: false });
    });
  }
  renderRoom = (room) => {
    return <div key={room.id} className="room-item"> {room.name} <Link to={`/room/${room.id}/messages`}><Button type="primary">Open</Button></Link></div>
  }

  render() {
    if (this.state.loading) {
      return <Spin />
    }
    if (this.state.currentRoom) {
      return <CurrentRoom id={this.state.currentRoom} />
    }
    return <div className="rooms">
      {this.props.chatroom.rooms.map((room) => {
        return this.renderRoom(room);
      })}
    </div>
  }
}

export default connect(
  state => ({
    chatroom: state.ChatRoom
  }),
  { getRooms }
)(RoomList);
