import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import { Layout } from 'containers/Layout/Layout';
import { UserNoteList } from 'containers/UserNoteList';
import { DashboardHeader } from 'containers/DashboardHeader';
import { Loading } from 'components/Loading';
import Error from 'components/Error';

import { getNotes } from 'actions/userNotes.actions';

import { APP_NAME } from '@constants';

const Dashboard = () => {
  const dispatch = useDispatch();
  const userNotes = useSelector((state) => state.userNotesReducer);

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  if (userNotes.loading) {
    return (
      <Layout center>
        <Loading />
      </Layout>
    );
  }

  if (userNotes.error) {
    return (
      <Layout center>
        <Error errorMessage="No fue posible cargar sus notas." />
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{APP_NAME} | Inicio</title>
      </Helmet>
      <DashboardHeader />
      <UserNoteList notes={userNotes.userNotes} />
    </Layout>
  );
};

export default Dashboard;
