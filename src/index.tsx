import { render } from 'react-dom';
import './styles/index.scss';
import Home from './pages/Home';
import Context from './Context';

render(
  <Context.Provider>
    <Home />
  </Context.Provider>,
  document.getElementById('app')
);
