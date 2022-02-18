import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import 'styles/Containers/UserNoteList.scss';

import { UserNote } from 'components/Note';
import { Select } from 'components/Select';
import FormControl from 'utils/classes/FormControl';

import { getCategories } from 'actions/categories.actions';
import { Layout } from './Layout/Layout';
import { Loading } from 'components/Loading';

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
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [noteList, setNoteList] = useState(notes);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
    return () => {};
  }, []);

  if (categories.loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

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
    setSelectedCategory({
      notes: filteredNotes,
      categoryId,
      category: categories.categories.find((category) => String(category.id) === categoryId).name,
    });
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
              {categories.categories.map(({ id, name }) => (
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
