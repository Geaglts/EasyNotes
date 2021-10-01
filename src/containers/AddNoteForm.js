import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { MdSpa, MdSort } from 'react-icons/md';

// actions
import { addNote } from '../redux/actions/notes.actions';

import { Context } from '../Context';

import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import useForm from '../hooks/useForm';

import '../styles/Containers/AddNoteForm.scss';

import { noteStorage } from '../storage';

function AddNoteForm({ onAddTodo }) {
  const { darkTheme } = useContext(Context);

  const initialState = {
    title: '',
    content: '',
  };

  const submit = async (values) => {
    if (cantSubmit()) {
      alert('Rellena los campos');
    } else {
      onAddTodo(values);
    }
  };

  const handleCopy = () => {
    if (cantSubmit()) {
      alert('No hay nada que copiar');
    } else {
      noteStorage.copy(values);
    }
  };

  const { values, handleSubmit, propsByName, cantSubmit } = useForm({
    initialState,
    submit,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className={`AddNoteForm ${darkTheme ? 'AddNoteFormDark' : ''}`}
    >
      <div className="AddNoteForm__Title">
        <Input
          Icon={<MdSpa />}
          placeholder="¿Cuál es el nombre de tu nota?"
          {...propsByName('title')}
        />
        <Button
          type="submit"
          label="Add Note"
          style={AddNoteButtonStyles(darkTheme)}
        />
      </div>
      <TextArea
        Icon={<MdSort />}
        placeholder="Bueno, lo que necesito registrar es..."
        rows={5}
        {...propsByName('content')}
      />
      <div className="AddNoteForm__CopyButton--container">
        <Button onClick={handleCopy} label="Copy" />
      </div>
    </form>
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
