import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import axiosClient from './axios-middleware';

const middlewares = [axiosClient];
let composeEnhancers = compose;
composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    ...reducers
  }),
  composeEnhancers(applyMiddleware(...middlewares))
);
export default store;
