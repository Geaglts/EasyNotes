import React from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import FreeNotes from 'pages/FreeNotes';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Login from 'pages/Login';
import Register from 'pages/Register';
import EmailSended from 'pages/EmailSended';

import { Menu } from 'containers/Menu';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="fast" element={<FreeNotes />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
        <Route exact path="email-sended" element={<EmailSended />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
