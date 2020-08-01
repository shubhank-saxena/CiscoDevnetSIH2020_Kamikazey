/** @format */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import 'antd/dist/antd.css';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
