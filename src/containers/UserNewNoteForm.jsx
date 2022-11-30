import React, { useRef, useState, useEffect } from 'react';
import { BsFolderSymlink } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { SimpleInput, SimpleTextArea } from '@components/Input';
import Button from '@components/Button';
import Toast from '@components/Toast';

import { addNote } from '@actions/userNotes.actions';

import useFormError from '@hooks/useFormError';

import classnames from '@utils/classnames';
import FormControl from '@utils/classes/FormControl';
import validate from '@utils/validate';
import { TOAST_TYPES } from '@components/Toast';
import { newNoteSchema } from '@schemas/newNote.schema';

import { useAuth } from '@hooks/useAuth';

import styles from '@styles/Containers/UserNewNoteForm.module.scss';

export const UserNewNoteForm = ({ afterCreate = () => {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoriesView, setCategoriesView] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const form = useRef(null);
  const { formErrors, addErrors } = useFormError();
  const { verifyToken } = useAuth();

  const getCategories = React.useCallback(async () => {
    const { data } = await axios.get('/api/v1/categories');
    setCategories(data.body);
  }, []);

  useEffect(() => {
    verifyToken().then((isValid) => {
      if (!isValid) {
        navigate('/login');
      } else {
        getCategories();
      }
    });
    return () => {};
  }, []);

  const createNewNote = async (e) => {
    e.preventDefault();
    const isValid = await verifyToken();
    if (!isValid) {
      navigate('/login');
      return;
    }
    const { encryptData, values } = new FormControl(form.current);
    const validationResult = await validate({
      schema: newNoteSchema,
      data: values,
    });
    if (!validationResult.approved) {
      const errors = [
        { message: validationResult.message, type: TOAST_TYPES.DANGER },
      ];
      addErrors(errors);
      return;
    }
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
        <div className={styles.categoriesContainer}>
          <div className={styles.headerButtons}>
            <button className={styles.closeButton} onClick={toggleCategories}>
              <p>Cerrar</p>
              <AiOutlineCloseCircle title="Cerrar" size={25} className="icon" />
            </button>
          </div>
          <div className={styles.categories}>
            {categories.map(({ name, description, id }) => {
              const isSelected = selectedCategories.includes(id);
              const parsedCategory = FormControl.decryptData({ name, description });
              return (
                <p
                  className={classnames(styles.category, styles[isSelected])}
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
      <form className={styles.formContainer} ref={form} onSubmit={createNewNote}>
        <div>
          <button
            type="button"
            onClick={toggleCategories}
            className={styles.showCategoryButton}
          >
            <BsFolderSymlink title="Enlazar con categoría" size={25} />
            <p>Agregar categoría (opcional)</p>
          </button>
        </div>
        <SimpleInput type="text" placeholder="Titulo de la nota" name="title" />
        <SimpleInput
          type="text"
          autoComplete="off"
          placeholder="Codigo secreto (No Obligatorio)"
          name="pin"
        />
        <SimpleTextArea
          placeholder="Contenido..."
          name="content"
          classes={[styles.contentTextArea]}
        />
        <Button label="Crear" type="submit" classNames={[styles.formButtonSubmit]} />
      </form>
      <Toast messages={formErrors} />
    </>
  );
};
