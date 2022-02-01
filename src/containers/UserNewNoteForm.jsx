import React, { useRef } from 'react';
import { BiBookContent } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

import TextArea from 'components/TextArea';
import { SimpleInput, SimpleTextArea } from 'components/Input';

import { addNote } from 'actions/userNotes.actions';

import FormControl from 'utils/classes/FormControl';

import 'styles/Containers/UserNewNoteForm.scss';
import Button from 'components/Button';

export const UserNewNoteForm = ({ afterCreate = () => {} }) => {
  const dispatch = useDispatch();
  const form = useRef(null);

  const createNewNote = async (e) => {
    e.preventDefault();
    const { encryptData } = new FormControl(form.current);
    dispatch(addNote(encryptData));
    afterCreate();
  };

  return (
    <form className="UserNewNoteForm" ref={form} onSubmit={createNewNote}>
      <SimpleInput type="text" placeholder="Titulo de la nota" classes={['title']} name="title" />
      <SimpleTextArea placeholder="Contenido..." name="content" classes={['unnf_sta']} />
      <Button label="Crear" type="submit" />
    </form>
  );
};
