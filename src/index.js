import { createRoot } from 'react-dom/client';
import Axios from 'axios';
import Context from '@context';

import App from '@routes/App';
import ReduxProvider from './redux/ReduxProvider';

import { GlobalStyle } from './globalStyles';
import '@styles/index.scss';

Axios.defaults.baseURL = process.env.API_URL;

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <Context.Provider>
    <ReduxProvider>
      <GlobalStyle />
      <App />
    </ReduxProvider>
  </Context.Provider>
);
