import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FreeNotes from 'pages/FreeNotes';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Login from 'pages/Login';
import Register from 'pages/Register';
import EmailSended from 'pages/EmailSended';
import ActivateAccount from 'pages/ActivateAccount';
import RecoveryPassword from 'pages/RecoveryPassword';
import Dashboard from 'pages/Dashboard';

import UserRoutes from './UserRoute';

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
        <Route exact path="activate-account" element={<ActivateAccount />} />
        <Route exact path="recovery-password" element={<RecoveryPassword />} />
        <Route element={<UserRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
