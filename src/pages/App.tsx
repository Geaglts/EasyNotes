import FreeNotes from './FreeNotes';
import { Menu } from '../containers/Menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/fast">
          <FreeNotes />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
