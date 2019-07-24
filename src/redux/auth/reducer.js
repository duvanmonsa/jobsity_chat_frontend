import actions from './actions';

const initState = {
  idToken: null,
  user: {}
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return { ...initState, idToken: action.token };
    case actions.LOGIN_ERROR:
      return initState;
    case actions.LOGOUT:
      return initState;
    case actions.GET_CURRENT_USER:
      return { ...state, user: action.payload };
    case actions.FORGOT_PASSWORD:
      return state;
    case actions.RESET_PASSWORD:
      return state;
    default:
      return state;
  }
}
