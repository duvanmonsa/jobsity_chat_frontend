import axios from 'axios';

export function createThunkMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      const jwt = getState().Auth.idToken || '';
      const axiosClient = axios.create({
        baseURL: 'http://localhost:4000',
        responseType: 'json'
      });
      axiosClient.interceptors.request.use(
        function (config) {
          if (jwt) {
            config.headers = Object.assign({}, config.headers, { Authorization: `Bearer ${jwt}` });
          }
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
      axiosClient.interceptors.response.use(
        function (response) {
          return response;
        },
        function (error) {
          let response = error.response;
          if (response && response.status === 401 && jwt) {
            window.location.replace('/404');
          }
          return Promise.reject(response && response.data ? response.data : error);
        }
      );
      return action(dispatch, getState, axiosClient);
    }
    return next(action);
  };
}

const thunkWithAxiosMiddleware = createThunkMiddleware();

export default thunkWithAxiosMiddleware;
