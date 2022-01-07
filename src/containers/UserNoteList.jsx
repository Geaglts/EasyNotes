import React from 'react';
import { UserNote } from 'components/Note';

import 'styles/Containers/UserNoteList.scss';

export const UserNoteList = ({ notes = [] }) => {
  return (
    <div className="UserNoteList">
      {notes.map((note) => (
        <UserNote {...note} key={note.id} />
      ))}
    </div>
  );
};

export default UserNoteList;
