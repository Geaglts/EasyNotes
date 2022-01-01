import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

const UserRoute = ({ element }) => {
  const [cookies] = useCookies();
  if (cookies.auth) {
    return <>{element}</>;
  }
  return <Navigate to="/login" />;
};

UserRoute.propTypes = {
  element: PropTypes.element,
};

export default UserRoute;
