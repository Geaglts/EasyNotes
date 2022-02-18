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
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

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

  return (
    <>
      <div className="UserNoteList">
        <div className="UserNoteList_SearchBar">
          <input type="text" placeholder="nombre de la nota..." onChange={onChangeNoteSearched} />
          <div className="UserNoteList_SearchBar-FilterByCategory">
            <MultiSelect title="Categorias">
              {categories.categories.map((category) => {
                return <MultiSelectOption label={category.name} />;
              })}
            </MultiSelect>
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
