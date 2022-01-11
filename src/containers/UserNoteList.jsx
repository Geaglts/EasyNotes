import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'styles/Containers/UserNoteList.scss';

import { UserNote } from 'components/Note';
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
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await axios.get('/api/v1/categories');
    if (response.data.body) {
      const categories = response.data.body.map((category) => {
        const { description, name } = category;
        const decryptData = FormControl.decryptData({ description, name });
        return {
          ...category,
          ...decryptData,
        };
      });
      setCategories(categories);
    }
  };

  useEffect(() => {
    getCategories();
    return () => {};
  }, []);

  const onChangeNoteSearched = (e) => {
    setNoteSearched(e.target.value);
  };

  return (
    <>
      <div className="UserNoteList">
        <div className="UserNoteList_SearchBar">
          <input type="text" placeholder="nombre de la nota..." onChange={onChangeNoteSearched} />
          <div className="UserNoteList_SearchBar-FilterByCategory">
            <p>filtrar por:</p>
            <select>
              {categories.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="UserNoteList_NoteList">
          {notes.filter(filterNotes(noteSearched)).map((note) => (
            <UserNote {...note} key={note.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserNoteList;
