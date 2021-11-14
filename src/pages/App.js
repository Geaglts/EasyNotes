import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FreeNotes from './FreeNotes';
import Home from './Home';
import NotFound from './NotFound';
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
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
