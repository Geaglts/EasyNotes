import React, { useRef, useState, useEffect } from 'react';
import { BsFolderSymlink } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { SimpleInput, SimpleTextArea } from '@components/Input';

import { addNote } from '@actions/userNotes.actions';

import FormControl from '@utils/classes/FormControl';

import '@styles/Containers/UserNewNoteForm.scss';

import Button from '@components/Button';

export const UserNewNoteForm = ({ afterCreate = () => {} }) => {
  const dispatch = useDispatch();
  const [categoriesView, setCategoriesView] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const form = useRef(null);

  const getCategories = async () => {
    const { data } = await axios.get('/api/v1/categories');
    setCategories(data.body);
  };

  useEffect(() => {
    getCategories();
    return () => {};
  }, []);

  const createNewNote = async (e) => {
    e.preventDefault();
    const { encryptData } = new FormControl(form.current);
    dispatch(addNote(encryptData, selectedCategories));
    afterCreate();
  };

  const toggleCategories = () => {
    setCategoriesView(!categoriesView);
  };

  const toggleSelectedCategories = (id) => () => {
    if (selectedCategories.includes(id)) {
      const filteredCategories = selectedCategories.filter(
        (idCategory) => idCategory !== id
      );
      setSelectedCategories(filteredCategories);
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  return (
    <>
      {categoriesView && (
        <div className="CategoriesNewNoteForm">
          <div className="UserNewNoteForm-HeaderButtons" onClick={toggleCategories}>
            <div className="UserNewNoteForm-CategoryInput CategoriesNewNoteForm-Close">
              <p>Cerrar</p>
              <AiOutlineCloseCircle title="Cerrar" size={25} className="icon" />
            </div>
          </div>
          <div className="CategoriesNewNoteForm_Container">
            {categories.map(({ name, description, id }) => {
              const isSelected = selectedCategories.includes(id);
              const parsedCategory = FormControl.decryptData({ name, description });
              return (
                <p
                  className={`Category ${isSelected} noselect`}
                  key={id}
                  onClick={toggleSelectedCategories(id)}
                >
                  {parsedCategory.name}
                </p>
              );
            })}
          </div>
        </div>
      )}
      <form className="UserNewNoteForm" ref={form} onSubmit={createNewNote}>
        <div onClick={toggleCategories} className="UserNewNoteForm-CategoryInput">
          <BsFolderSymlink title="Enlazar con categoría" size={25} />
          <p>Agregar categoría (opcional)</p>
        </div>
        <SimpleInput
          type="text"
          placeholder="Titulo de la nota"
          classes={['title']}
          name="title"
        />
        <SimpleInput
          type="text"
          autoComplete="off"
          placeholder="Codigo secreto (No Obligatorio)"
          classes={['pin']}
          name="pin"
        />
        <SimpleTextArea
          placeholder="Contenido..."
          name="content"
          classes={['unnf_sta']}
        />
        <Button label="Crear" type="submit" />
      </form>
    </>
  );
};
