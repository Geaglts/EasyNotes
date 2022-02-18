import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'styles/Containers/UserNoteList.scss';

import { UserNote } from 'components/Note';
import { Loading } from 'components/Loading';
import { MultiSelect } from 'components/MultiSelect';
import { MultiSelectOption } from 'components/MultiSelect/MultiSelectOption';

import { getCategories } from 'actions/categories.actions';
import { Layout } from './Layout/Layout';

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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [noteList, setNoteList] = useState(notes);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
    return () => {};
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const filterNotesByCategory = notes.filter((note) => {
        if (note.categories.length > 0) {
          return note.categories.some(({ id }) => selectedCategories.includes(id));
        }
        return false;
      });
      setNoteList(filterNotesByCategory);
    } else {
      setNoteList(notes);
    }
    return () => setNoteList([]);
  }, [selectedCategories]);

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

  const onCheckCategory = (categoryId) => (evt) => {
    if (selectedCategories.includes(categoryId)) {
      const removedId = selectedCategories.filter((id) => id !== categoryId);
      setSelectedCategories(removedId);
      return;
    }
    const { categories: categoryList } = categories;
    const categoryIndex = categoryList.findIndex((category) => category.id === categoryId);
    if (categoryIndex > -1) {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const cleanSelectedCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <>
      <div className="UserNoteList">
        <div className="UserNoteList_SearchBar">
          <input type="text" placeholder="nombre de la nota..." onChange={onChangeNoteSearched} />
          <div className="UserNoteList_SearchBar-FilterByCategory">
            <MultiSelect title="Categorias" items={selectedCategories.length} cleanSelection={cleanSelectedCategories}>
              {categories.categories.map(({ id, name }) => {
                return (
                  <MultiSelectOption key={id} id={id} currentSelected={selectedCategories} handleChange={onCheckCategory(id)}>
                    {name}
                  </MultiSelectOption>
                );
              })}
            </MultiSelect>
          </div>
        </div>
        <div className="UserNoteList_NoteList">
          {noteList.filter(filterNotes(noteSearched)).map((note) => (
            <UserNote {...note} key={note.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserNoteList;
