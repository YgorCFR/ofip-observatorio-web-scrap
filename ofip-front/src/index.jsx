import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-datepicker/dist/react-datepicker.css';

import $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import Popper from 'popper.js';
import { store } from './helpers/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
