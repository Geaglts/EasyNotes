import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Layout } from '@containers/Layout/Layout';
import { Loading } from '@components/Loading';

import { useAuth } from '@hooks/useAuth';

const UserRoute = () => {
  const { isLogged, verifyToken } = useAuth();

  useEffect(() => {
    verifyToken();
    return () => {};
  }, []);

  if (isLogged === undefined) {
    return (
      <Layout center>
        <Loading />
      </Layout>
    );
  }

  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
