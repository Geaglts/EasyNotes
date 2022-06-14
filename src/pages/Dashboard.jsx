import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import { Layout } from 'containers/Layout/Layout';
import { UserNoteList } from 'containers/UserNoteList';
import { DashboardHeader } from 'containers/DashboardHeader';
import PaginationMenu from 'components/PaginationMenu';

import { getNotes } from 'actions/userNotes.actions';

import { APP_NAME } from '@constants';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const notes = useSelector((state) => state.userNotesReducer.userNotes);
  const loading = useSelector((state) => state.userNotesReducer.loading);
  const pagination = useSelector((state) => state.userNotesReducer.pagination);

  useEffect(() => {
    dispatch(getNotes(page));
  }, [page]);

  const nextPage = () => {
    setPage(pagination.next);
  };

  const previouspage = () => {
    setPage(pagination.previous);
  };

  console.log(notes);

  return (
    <Layout>
      <Helmet>
        <title>{APP_NAME} | Inicio</title>
      </Helmet>
      <DashboardHeader />
      {!loading && (
        <UserNoteList notes={notes}>
          <PaginationMenu next={nextPage} previous={previouspage}>
            <p>
              {page} de {pagination.totalPages}
            </p>
          </PaginationMenu>
        </UserNoteList>
      )}
    </Layout>
  );
};

export default Dashboard;
