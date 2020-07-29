/* ***********************************************************************
 * index.js
 * -----------------------------------------------------------------------
 * Handles app startup.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);