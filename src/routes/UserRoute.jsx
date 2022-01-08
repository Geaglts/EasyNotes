import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from 'components/Loading';

import { useAuth } from 'hooks/useAuth';

const UserRoute = () => {
  const { isLoading, isLogged } = useAuth();

  if (isLoading) return <Loading />;

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default UserRoute;
