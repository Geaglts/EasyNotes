import React, { useContext, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { MdSpa, MdSort } from 'react-icons/md';
import 'styles/Containers/AddNoteForm.scss';

import Button from 'components/Button';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import Toast from 'components/Toast';

import { Context } from 'context';
import { addNote } from 'actions/notes.actions';
import useFormError from 'hooks/useFormError';

import { noteStorage } from 'storage';
import { isEmpty } from 'utils/isFunctions';

// Validations
import validate from 'utils/validate';
import { newNoteSchema } from 'schemas/newNote.schema';

function AddNoteForm({ onAddTodo }) {
  const { darkTheme } = useContext(Context);
  const { formErrors, addErrors } = useFormError();
  const form = useRef(null);

  const themeClass = darkTheme ? 'AddNoteFormDark' : '';

  const handleCopy = () => {
    const formData = new FormData(form.current);
    const { title, content } = { title: formData.get('title'), content: formData.get('content') };
    if (isEmpty(title) || isEmpty(content)) {
      alert('No hay nada que copiar');
    } else {
      noteStorage.copy(values);
    }
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = { title: formData.get('title'), content: formData.get('content') };
    const validatedData = await validate({ schema: newNoteSchema, data });
    if (!validatedData.approved) {
      const newError = { message: validatedData.message, type: 'danger' };
      addErrors([newError]);
      return;
    }
    onAddTodo(validatedData.data);
    form.current.reset();
  };

  return (
    <>
      <form ref={form} onSubmit={onSubmitForm} className={`AddNoteForm ${themeClass}`}>
        <div className="AddNoteForm__Title">
          <Input name="title" Icon={<MdSpa />} placeholder="¿Cuál es el nombre de tu nota?" />
          <Button type="submit" label="Agregar nota" style={AddNoteButtonStyles(darkTheme)} />
        </div>
        <TextArea name="content" Icon={<MdSort />} placeholder="Creo que..." rows={5} />
        <div className="AddNoteForm__CopyButton--container">
          <Button onClick={handleCopy} label="Copiar" />
        </div>
      </form>
      <Toast messages={formErrors} />
    </>
  );
}

// JS Styles
const AddNoteButtonStyles = (darkTheme) => {
  if (darkTheme) {
    return {
      backgroundColor: '#141414',
      color: '#FFDF75',
      border: '1px solid #ffdf75',
    };
  } else {
    return {
      color: '#475DED',
      backgroundColor: '#FFDF75',
    };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo(note) {
      dispatch(addNote(note));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddNoteForm);
