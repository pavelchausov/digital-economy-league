import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducers, uiStateReducers } from '../reducers';
// eslint-disable-next-line no-underscore-dangle
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;

const rootReducer = combineReducers({ state: reducers, uiState: uiStateReducers });
const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  // reduxDevtools && reduxDevtools(),
));

export default store;
