import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const FreeNotes = lazy(() => import('@pages/FreeNotes'));
const Home = lazy(() => import('@pages/Home'));
const NotFound = lazy(() => import('@pages/NotFound'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const Auth = lazy(() => import('@pages/Auth'));
const EmailSended = lazy(() => import('@pages/EmailSended'));
const ActivateAccount = lazy(() => import('@pages/ActivateAccount'));
const RecoveryPassword = lazy(() => import('@pages/RecoveryPassword'));
const Dashboard = lazy(() => import('@pages/Dashboard'));
const Categories = lazy(() => import('@pages/users/Categories/Categories'));

import UserRoutes from './UserRoute';

import { Menu } from '@containers/Menu';

function App() {
  return (
    <Suspense fallback={<></>}>
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
            <Route path="/categories" element={<Categories />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
