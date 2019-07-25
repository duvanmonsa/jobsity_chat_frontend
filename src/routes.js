import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import authActions from './redux/auth/actions';
import RoomList from './containers/roomList';
import CurrentRoom from './containers/currentRoom';
import Signin from './containers/signin';

import './containers/chatroom.scss';

const { checkAuthorization, logout } = authActions;

class Routes extends Component {
  componentDidMount() {
    this.props.checkAuthorization();
  }

  render() {
    if (!this.props.auth.idToken) {
      return <Signin />
    }
    return <Router>
      <div className="chat">
        <ul>
          <li>
            <Link to="/">Chat Rooms</Link>
          </li>
          <li>
            {this.props.auth.idToken && this.props.auth.user.name}
          </li>
          <li>
            {this.props.auth.idToken && <Button type="danger" onClick={this.props.logout}>Salir</Button>}
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={RoomList} />
        <Route path="/room/:id" component={CurrentRoom} />
      </div>
    </Router >;
  }
}

export default connect(
  state => ({
    auth: state.Auth
  }),
  { checkAuthorization, logout }
)(Routes);