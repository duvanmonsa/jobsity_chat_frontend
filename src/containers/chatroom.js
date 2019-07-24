import React, { Component } from 'react';
import { connect } from 'react-redux';

import authActions from '../redux/auth/actions';
import Signin from './signin';
import RoomList from './roomList';

import './chatroom.scss';

const { checkAuthorization } = authActions;

export class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }
  componentDidMount() {
    this.props.checkAuthorization();
  }

  render() {
    let view;
    if (!this.props.auth.idToken) {
      view = <Signin />;
    }
    else {
      view = <RoomList />;
    }
    return (
      <div className="chat">
        {view}
      </div>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth
  }),
  { checkAuthorization }
)(ChatRoom);
