import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FreeNotes from './FreeNotes';
import Home from './Home';
import { Menu } from '../containers/Menu';

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
