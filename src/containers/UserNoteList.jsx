import React, { useState, useMemo } from 'react';
import { UserNote } from 'components/Note';

import 'styles/Containers/UserNoteList.scss';
import FormControl from 'utils/classes/FormControl';

const filterNotes =
  (noteSearched = '') =>
  (note) => {
    const { title } = FormControl.decryptData({ title: note.title });
    const parsedTitle = title.trim().toLowerCase();
    if (parsedTitle.includes(noteSearched)) {
      return true;
    }
    return false;
  };

export const UserNoteList = ({ notes = [] }) => {
  const [noteSearched, setNoteSearched] = useState('');

  const noteListMemo = useMemo(() => notes.filter(filterNotes(noteSearched)), [noteSearched]);

  const onChangeNoteSearched = (e) => {
    setNoteSearched(e.target.value);
  };

  return (
    <>
      <div className="UserNoteList">
        <div className="UserNoteList_SearchBar">
          <input type="text" placeholder="nombre de la nota..." onChange={onChangeNoteSearched} />
        </div>
        <div className="UserNoteList_NoteList">
          {noteListMemo.map((note) => (
            <UserNote {...note} key={note.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserNoteList;
