import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Layout } from '@containers/Layout/Layout';
import { UserNoteList } from '@containers/UserNoteList';
import { DashboardHeader } from '@containers/DashboardHeader';
import PaginationMenu from '@components/PaginationMenu';

import { useAuth } from '@hooks/useAuth';

import { getNotes } from '@actions/userNotes.actions';

import { APP_NAME } from '@constants';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredNotes = useSelector((state) => state.userNotesReducer.filtered);
  const notes = useSelector((state) => state.userNotesReducer.userNotes);
  const pagination = useSelector((state) => state.userNotesReducer.pagination);
  const { verifyToken } = useAuth();

  useEffect(() => {
    verifyToken().then((isValid) => {
      if (!isValid) {
        navigate('/login');
      } else {
        dispatch(getNotes(pagination.page));
      }
    });
    return () => {};
  }, [pagination.page]);

  const nextPage = async () => {
    const isValid = await verifyToken();
    if (!isValid) {
      navigate('/login');
      return;
    }
    dispatch(getNotes(pagination.next));
  };

  const previouspage = async () => {
    const isValid = await verifyToken();
    if (!isValid) {
      navigate('/login');
      return;
    }
    dispatch(getNotes(pagination.previous));
  };

  return (
    <Layout>
      <Helmet>
        <title>{APP_NAME} | Inicio</title>
      </Helmet>
      <DashboardHeader />
      <UserNoteList notes={notes}>
        {!filteredNotes && (
          <PaginationMenu next={nextPage} previous={previouspage}>
            <p>
              {pagination.page} de {pagination.totalPages || '1'}
            </p>
          </PaginationMenu>
        )}
      </UserNoteList>
    </Layout>
  );
};

export default Dashboard;
