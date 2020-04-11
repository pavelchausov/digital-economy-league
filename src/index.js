import React from 'react';
import ReactDOM from 'react-dom';

import store from './store';
import { Provider } from 'react-redux';

import App from './app';

import 'normalize.css';
import './scss/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
