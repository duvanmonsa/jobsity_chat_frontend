import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import ChatRoom from './containers/chatroom';

class App extends Component {

  render() {
    return <Provider store={store}>
      <ChatRoom />
    </Provider>;
  }
}

export default App;