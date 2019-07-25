const actions = {
  GET_ROOMS: 'GET_ROOMS',
  GET_ROOM_MESSAGES: 'GET_ROOM_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',
  getRooms: () => {
    return (dispatch, getState, axios) => {
      let url = `/chatroom`;
      return axios.get(url).then(response => {
        return dispatch({
          type: actions.GET_ROOMS,
          payload: response
        });
      });
    };
  },
  getRoomMessages: (id) => {
    return (dispatch, getState, axios) => {
      let url = `/chatroom/${id}/messages`;
      return axios.get(url).then(response => {
        return dispatch({
          type: actions.GET_ROOM_MESSAGES,
          payload: response
        });
      });
    };
  },
  addMessage: (message) => {
    return (dispatch, getState, axios) => {
      return dispatch({
        type: actions.ADD_MESSAGE,
        payload: message
      });
    };
  }
};

export default actions;
