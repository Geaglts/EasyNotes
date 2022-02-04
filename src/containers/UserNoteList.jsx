import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'styles/Containers/UserNoteList.scss';

import { UserNote } from 'components/Note';
import { Select } from 'components/Select';
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
  const [noteList, setNoteList] = useState(notes);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    return () => {
      setCategories([]);
    };
  }, []);

  const onChangeNoteSearched = (e) => {
    setNoteSearched(e.target.value);
  };

  const onChangeCategory = (e) => {
    const categoryId = e.target.value;
    if (categoryId === 'select_init_value') {
      setSelectedCategory(null);
      return;
    }
    const filteredNotes = noteList.filter((note) => {
      return note.categories.some(({ id }) => String(id) === categoryId);
    });
    setSelectedCategory({ notes: filteredNotes, categoryId, category: categories.find((category) => String(category.id) === categoryId).name });
  };

  const resetCategory = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      <div className="UserNoteList">
        <div className="UserNoteList_SearchBar">
          <input type="text" placeholder="nombre de la nota..." onChange={onChangeNoteSearched} />
          <div className="UserNoteList_SearchBar-FilterByCategory">
            <p>filtrar por:</p>
            <Select value={selectedCategory?.categoryId || 'select_init_value'} label="Categorias" onChange={onChangeCategory}>
              {categories.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </Select>
            {selectedCategory && (
              <button onClick={resetCategory} className="UserNoteList_SearchBar--SelectedCategory">
                x {selectedCategory.category}
              </button>
            )}
          </div>
        </div>
        <div className="UserNoteList_NoteList">
          {(selectedCategory ? selectedCategory.notes : noteList.filter(filterNotes(noteSearched))).map((note) => (
            <UserNote {...note} key={note.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserNoteList;
