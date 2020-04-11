import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from '../reducers';
// eslint-disable-next-line no-underscore-dangle
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  reduxDevtools && reduxDevtools(),
));

export default store;
