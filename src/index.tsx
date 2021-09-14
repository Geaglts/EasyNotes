import { render } from 'react-dom';
import './styles/index.scss';
import App from './pages/App';
import Context from './Context';

render(
  <Context.Provider>
    <App />
  </Context.Provider>,
  document.getElementById('app')
);
