import { useContext } from 'react';
import { MdSpa, MdSort } from 'react-icons/md';

import { Context } from '../Context';

import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import useForm from '../Hooks/useForm';

import '../styles/Containers/AddNoteForm.scss';

import { noteStorage } from '../storage';
import { Note, RenderCss } from '../types';

function AddNoteForm() {
  const { updateNotes, darkTheme } = useContext(Context);

  const initialState = {
    title: '',
    content: '',
  };

  const submit = (values: typeof initialState) => {
    if (cantSubmit()) {
      alert('Rellena los campos');
    } else {
      noteStorage.add(values);
      updateNotes();
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
    <form onSubmit={handleSubmit} className="AddNoteForm">
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
        <Button
          onClick={handleCopy}
          label="Copy"
          style={CopyButtonStyles(darkTheme)}
        />
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

const CopyButtonStyles: RenderCss = (darkTheme) => {
  if (darkTheme) {
    return {
      backgroundColor: '#141414',
      color: '#FFDF75',
      border: '1px solid #ffdf75',
    };
  } else {
    return {
      backgroundColor: '#475DED',
      color: '#FFDF75',
    };
  }
};

export default AddNoteForm;
