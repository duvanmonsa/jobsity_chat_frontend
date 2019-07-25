import actions from './actions';

const initState = {
  rooms: [],
  currentRoom: {
    messages: []
  }
};

export default function conversationReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_ROOMS:
      return { ...state, rooms: action.payload.data };
    case actions.GET_ROOM_MESSAGES:
      return {
        ...state, currentRoom: {
          messages: action.payload.data
        }
      };
    case actions.ADD_MESSAGE:
      const messages = state.currentRoom.messages;
      messages.push(action.payload);
      return {
        ...state, currentRoom: {
          messages
        }
      };
    default:
      return state;
  }
}
