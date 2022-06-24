import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '@styles/Containers/UserNoteList.scss';

import { UserNote } from '@components/Note';
import SearchInput from '@components/SearchInput';
import {
  MultiSelect,
  MultiSelectOption,
  MultiSelectSearchBar,
  MultiSelectOptions,
} from '@components/MultiSelect';

import { getCategories } from '@actions/categories.actions';
import { filterLocal, fillGlobalNotes } from '@actions/userNotes.actions';

import FormControl from '@utils/classes/FormControl';

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

const filterCategories = (categoryName) => (category) => {
  return category.name
    .toLowerCase()
    .trim()
    .includes(categoryName.toLowerCase().trim());
};

export const UserNoteList = ({ children, notes }) => {
  const [noteSearched, setNoteSearched] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchedCategory, setSearchedCategory] = useState('');
  const [noteList, setNoteList] = useState(notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);
  const { userNotes, filtered: filteredNotes } = useSelector(
    (state) => state.userNotesReducer
  );

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
    const categoryIndex = categoryList.findIndex(
      (category) => category.id === categoryId
    );
    if (categoryIndex > -1) {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const cleanSelectedCategories = () => {
    setSelectedCategories([]);
    setSearchedCategory('');
  };

  const goToCategoriesPage = () => {
    navigate('/categories');
  };

  return (
    <>
      <div className="UserNoteList">
        <div className="UserNoteList_SearchBar">
          <SearchInput onLocalFilter={filterLocal} globalMode={fillGlobalNotes} />
          {!categories.loading && (
            <div className="UserNoteList_SearchBar-FilterByCategory">
              <MultiSelect
                title="Categorias"
                items={selectedCategories.length}
                cleanSelection={cleanSelectedCategories}
                cb={() => setSearchedCategory('')}
                onClickConfig={goToCategoriesPage}
              >
                {({ handleShowedContent }) => {
                  return (
                    <>
                      <MultiSelectSearchBar
                        type="text"
                        placeholder="categoria"
                        onChange={(evt) => setSearchedCategory(evt.target.value)}
                        value={searchedCategory}
                      />
                      <MultiSelectOptions handleShowedContent={handleShowedContent}>
                        {categories.categories
                          .filter(filterCategories(searchedCategory))
                          .map(({ id, name }) => {
                            return (
                              <MultiSelectOption
                                key={id}
                                id={id}
                                currentSelected={selectedCategories}
                                handleChange={onCheckCategory(id)}
                              >
                                {name.length < 12 ? name : name.slice(0, 9) + '...'}
                              </MultiSelectOption>
                            );
                          })}
                      </MultiSelectOptions>
                    </>
                  );
                }}
              </MultiSelect>
            </div>
          )}
        </div>
        <div className="UserNoteList_Features">{children}</div>
        <div className="UserNoteList_NoteList">
          {(filteredNotes || userNotes).map((note) => (
            <UserNote {...note} key={note.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserNoteList;
