import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FreeNotes from './FreeNotes';
import Home from './Home';
import NotFound from './NotFound';
import Login from './Login';
import Register from './Register';
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
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
