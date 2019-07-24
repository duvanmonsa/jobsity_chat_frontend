import { clearToken, getToken } from '../../utils/utility';


const actions = {
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  GET_CURRENT_USER: 'GET_CURRENT_USER',
  checkAuthorization: () => {
    return function (dispatch, getState, axios) {
      const { idToken } = getToken();
      if (idToken) {
        dispatch({
          type: actions.LOGIN_SUCCESS,
          token: idToken
        });
        dispatch(actions.getCurrentUser());
      }
    };
  },
  login: user => {
    return function (dispatch, getState, axios) {
      return axios
        .post('/auth/login', {
          email: user.username,
          password: user.password
        })
        .then(response => {
          localStorage.setItem('id_token', response.data.accessToken);
          return dispatch({
            type: actions.LOGIN_SUCCESS,
            token: response.data.accessToken
          });
        })
        .then(() => {
          return dispatch(actions.getCurrentUser());
        })
        .catch(error => {
          return Promise.reject(error);
        });
    };
  },
  logout: () => {
    return (dispatch, getState, axios) => {
      clearToken();
      dispatch({
        type: actions.LOGOUT
      });
    };
  },
  getCurrentUser: () => {
    return (dispatch, getState, axios) => {
      return axios
        .get('/users/me')
        .then(response => {
          dispatch({
            type: actions.GET_CURRENT_USER,
            payload: response.data
          });
          return response.data;
        })
        .catch(err => {
          return dispatch(actions.logout());
        });
    };
  }
};
export default actions;
