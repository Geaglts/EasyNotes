import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Layout } from 'containers/Layout/Layout';
import { Loading } from 'components/Loading';

import { useAuth } from 'hooks/useAuth';

const UserRoute = () => {
  const { isLoading, isLogged } = useAuth();

  if (isLoading) {
    return (
      <Layout center>
        <Loading />
      </Layout>
    );
  }

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default UserRoute;
