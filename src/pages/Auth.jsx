import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '@containers/Layout/Layout';
import { Loading } from '@components/Loading';

import { Context } from '@context';

function Auth() {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const { changeUserStatus, hasUser } = useContext(Context);

  useEffect(() => {
    if (hasUser) return navigate('/dashboard');
    if (query.get('token')) {
      changeUserStatus(query.get('token'));
      return navigate('/dashboard');
    } else {
      return navigate('/');
    }
  }, [query]);

  return (
    <Layout center={true}>
      <Loading />
    </Layout>
  );
}

export default Auth;
