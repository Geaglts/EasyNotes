import { render } from 'react-dom';
import './styles/index.scss';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers';
import App from './pages/App';
import Context from './Context';

const store = createStore(reducers, applyMiddleware(reduxThunk));

render(
  <Provider store={store}>
    <Context.Provider>
      <App />
    </Context.Provider>
  </Provider>,
  document.getElementById('app')
);
