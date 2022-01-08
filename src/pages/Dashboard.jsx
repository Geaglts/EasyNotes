import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'containers/Layout/Layout';
import { UserNoteList } from 'containers/UserNoteList';
import { DashboardHeader } from 'containers/DashboardHeader';
import { Loading } from 'components/Loading';
import Error from 'components/Error';

import { getNotes } from 'actions/userNotes.actions';

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
      <DashboardHeader />
      <UserNoteList notes={userNotes.userNotes} />
    </Layout>
  );
};

export default Dashboard;
