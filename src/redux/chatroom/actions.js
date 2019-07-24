const actions = {
  GET_ROOMS: 'GET_ROOMS',
  GET_ROOM_MESSAGES: 'GET_ROOM_MESSAGES',
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
  }
};

export default actions;
