import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

import { getNotes } from 'actions/userNotes.actions';
import { UserNote } from 'components/Note';

import 'styles/Containers/UserNoteList.scss';

export const UserNoteList = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['auth']);
  const userNotes = useSelector((state) => state.userNotesReducer);

  useEffect(() => {
    dispatch(getNotes(cookies.auth));
    return () => {};
  }, []);

  if (userNotes.loading) {
    return <p>loading</p>;
  }

  if (userNotes.error) {
    return <p>error</p>;
  }

  return (
    <div className="UserNoteList">
      {userNotes.userNotes.map((note) => (
        <UserNote {...note} key={note.id} />
      ))}
    </div>
  );
};

export default UserNoteList;
