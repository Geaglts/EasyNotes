import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormControl from '@utils/classes/FormControl';

import Modal from '@components/Modal';
import { SimpleInput, SimpleTextArea } from '@components/Input';
import Button from '@components/Button';
import Toast from '@components/Toast';

import CategoryMenu from '@fragments/UserUpdateNoteForm/CategoryMenu';

import { updateNote } from '@actions/userNotes.actions';

import useError from '@hooks/useError';
import { useAuth } from '@hooks/useAuth';

import validate from '@utils/validate';
import { updateNoteSchema } from '@schemas/user.schema';

import styles from '@styles/Containers/UserUpdateNoteForm.module.scss';

const UserUpdateNoteForm = ({
  show,
  toggleShow,
  title,
  pin,
  decryptTitle,
  decryptedContent,
  categories,
  noteId,
}) => {
  const navigate = useNavigate();
  const categoryList = useSelector((state) => state.categories.categories);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories);
  const updateForm = useRef(null);
  const dispatch = useDispatch();
  const { error, showError } = useError();
  const { verifyToken } = useAuth();

  const onUpdateNote = async (evt) => {
    evt.preventDefault();
    const isValid = await verifyToken();
    if (!isValid) {
      navigate('/login');
      return;
    }
    const updateFormControl = new FormControl(updateForm.current);
    const validationStatus = await validate({
      schema: updateNoteSchema,
      data: updateFormControl.values,
    });
    if (validationStatus.approved) {
      // Get only the ids of the categories
      const selectedCategories = await selectedCategory.map(
        (category) => category.id
      );
      const values = updateFormControl.encryptData;
      dispatch(updateNote(values, noteId, selectedCategories));
      toggleShow();
    } else {
      showError({ message: validationStatus.message, type: 'danger' });
    }
  };

  const handleSelectCategories = (id) => {
    const isOnThelist = selectedCategory.some((category) => category.id === id);
    if (isOnThelist) {
      const filterCategories = selectedCategory.filter(
        (category) => category.id !== id
      );
      setSelectedCategory(filterCategories);
    } else {
      setSelectedCategory([...selectedCategory, { id }]);
    }
  };

  return (
    <Modal active={show} changeStatus={toggleShow} title={`${title}`}>
      {showCategories && (
        <CategoryMenu
          categories={categoryList}
          selectedCategory={selectedCategory}
          onChange={handleSelectCategories}
          onClose={() => setShowCategories(false)}
        />
      )}
      <button
        className={styles.category_manage}
        onClick={() => {
          setShowCategories(true);
        }}
      >
        Cambiar categorias
      </button>
      <form
        className="UserNote_UpdateModal"
        ref={updateForm}
        onSubmit={onUpdateNote}
      >
        <SimpleInput
          classes={['UserNote_UpdateModal-title']}
          placeholder="Nuevo titulo"
          defaultValue={decryptTitle}
          name="title"
        />
        <SimpleInput placeholder="Nuevo pin" defaultValue={pin} name="pin" />
        <SimpleTextArea
          classes={['UserNote_UpdateModal-content']}
          placeholder="Nuevo contenido"
          defaultValue={decryptedContent}
          name="content"
        />
        <Button classNames={['UserNote_UpdateModal-submit']} type="submit">
          Actualizar nota
        </Button>
      </form>
      {error && <Toast messages={[error]} />}
    </Modal>
  );
};

export default UserUpdateNoteForm;
