import React from 'react';
import { render } from 'react-dom';
import 'styles/index.scss';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers';
import Context from 'context';
import Axios from 'axios';

Axios.defaults.baseURL = process.env.API_URL;

import App from 'routes/App';

import { GlobalStyle } from './globalStyles';

const store = createStore(reducers, applyMiddleware(reduxThunk));

render(
  <Context.Provider>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </Context.Provider>,
  document.getElementById('app')
);
