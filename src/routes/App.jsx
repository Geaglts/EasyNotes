import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FreeNotes from 'pages/FreeNotes';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Login from 'pages/Login';
import Register from 'pages/Register';
import EmailSended from 'pages/EmailSended';

import { Menu } from 'containers/Menu';

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
        <Route exact path="/email-sended">
          <EmailSended />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
