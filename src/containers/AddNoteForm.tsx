import { useContext } from 'react';
import { connect } from 'react-redux';
import { MdSpa, MdSort } from 'react-icons/md';

// actions
import { addNote } from '../redux/actions/NotesActions';

import { Context } from '../Context';

import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import useForm from '../hooks/useForm';

import '../styles/Containers/AddNoteForm.scss';

import { noteStorage } from '../storage';
import { Note, RenderCss } from '../types';

interface AddNoteFormProps {
  addNote?: (note: Note) => void;
}

function AddNoteForm({ addNote }: AddNoteFormProps) {
  const { darkTheme } = useContext(Context);

  const initialState = {
    title: '',
    content: '',
  };

  const submit = async (values: typeof initialState) => {
    if (cantSubmit()) {
      alert('Rellena los campos');
    } else {
      if (addNote) addNote(values);
    }
  };

  const handleCopy = () => {
    if (cantSubmit()) {
      alert('No hay nada que copiar');
    } else {
      noteStorage.copy(values as Note);
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
        <Input Icon={<MdSpa />} placeholder="Note Title" {...propsByName('title')} />
        <Button
          type="submit"
          label="Add Note"
          style={AddNoteButtonStyles(darkTheme)}
        />
      </div>
      <TextArea
        Icon={<MdSort />}
        placeholder="Note Content"
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
const AddNoteButtonStyles: RenderCss = (darkTheme) => {
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

export default connect(null, { addNote })(AddNoteForm);
