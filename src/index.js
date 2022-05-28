import React from 'react';
import { render } from 'react-dom';
import Context from 'context';
import Axios from 'axios';

import App from 'routes/App';
import ReduxProvider from './redux/ReduxProvider';

import { GlobalStyle } from './globalStyles';
import 'styles/index.scss';

Axios.defaults.baseURL = process.env.API_URL;

render(
  <Context.Provider>
    <ReduxProvider>
      <GlobalStyle />
      <App />
    </ReduxProvider>
  </Context.Provider>,
  document.getElementById('app')
);
