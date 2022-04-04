import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import FormControl from 'utils/classes/FormControl';

import Modal from 'components/Modal';
import { SimpleInput, SimpleTextArea } from 'components/Input';
import Button from 'components/Button';
import Toast from 'components/Toast';

import { updateNote } from 'actions/userNotes.actions';

import useError from 'hooks/useError';

import validate from 'utils/validate';
import { updateNoteSchema } from 'schemas/user.schema';

const UserUpdateNoteForm = ({ show, toggleShow, title, decryptTitle, decryptedContent, noteId }) => {
  const updateForm = useRef(null);
  const dispatch = useDispatch();
  const { error, showError } = useError();

  const onUpdateNote = async (evt) => {
    evt.preventDefault();
    const updateFormControl = new FormControl(updateForm.current);
    const validationStatus = await validate({ schema: updateNoteSchema, data: updateFormControl.values });
    if (validationStatus.approved) {
      const values = updateFormControl.encryptData;
      dispatch(updateNote(values, noteId));
      toggleShow();
    } else {
      showError({ message: validationStatus.message, type: 'danger' });
    }
  };

  return (
    <Modal active={show} changeStatus={toggleShow} title={`${title}`}>
      <form className="UserNote_UpdateModal" ref={updateForm} onSubmit={onUpdateNote}>
        <SimpleInput classes={['UserNote_UpdateModal-title']} placeholder="Nuevo titulo" defaultValue={decryptTitle} name="title" />
        <SimpleTextArea classes={['UserNote_UpdateModal-content']} placeholder="Nuevo contenido" defaultValue={decryptedContent} name="content" />
        <Button classNames={['UserNote_UpdateModal-submit']} type="submit">
          Actualizar nota
        </Button>
      </form>
      {error && <Toast messages={[error]} />}
    </Modal>
  );
};

export default UserUpdateNoteForm;
