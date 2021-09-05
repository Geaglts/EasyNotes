import { useContext } from 'react';
import { MdSpa } from 'react-icons/md';

import { Context } from '../Context';

import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import useForm from '../Hooks/useForm';

import '../styles/Containers/AddNoteForm.scss';

import { noteStorage } from '../storage';

function AddNoteForm() {
  const { updateNotes } = useContext(Context);

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

  const { handleSubmit, propsByName, cantSubmit } = useForm({
    initialState,
    submit,
  });

  return (
    <form onSubmit={handleSubmit} className="AddNoteForm">
      <div className="AddNoteForm__Title">
        <Input Icon={<MdSpa />} placeholder="Note Title" {...propsByName('title')} />
        <Button type="submit" label="Add Note" />
      </div>
      <TextArea placeholder="Note Content" rows={5} {...propsByName('content')} />
      <div className="AddNoteForm__CopyButton--container">
        <Button label="Copy" style={CopyButtonStyles} />
      </div>
    </form>
  );
}

// JS Styles
const CopyButtonStyles = { backgroundColor: '#475DED', color: '#FFDF75' };

export default AddNoteForm;
