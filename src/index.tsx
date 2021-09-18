import { render } from 'react-dom';
import './styles/index.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './Redux/Reducers';
import App from './pages/App';
import Context from './Context';

const store = createStore(reducers);

render(
  <Provider store={store}>
    <Context.Provider>
      <App />
    </Context.Provider>
  </Provider>,
  document.getElementById('app')
);
