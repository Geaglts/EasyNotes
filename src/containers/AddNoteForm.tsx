import { FormEvent } from 'react';
import { MdSpa } from 'react-icons/md';

import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';

import '../styles/Containers/AddNoteForm.scss';

function Form() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Holaaa!!!');
  };

  return (
    <form onSubmit={handleSubmit} className="AddNoteForm">
      <div className="AddNoteForm__Title">
        <Input Icon={<MdSpa />} placeholder="Note Title" />
        <Button type="submit" label="Add Note" />
      </div>
      <TextArea placeholder="Note Content" rows={5} />
      <div className="AddNoteForm__CopyButton--container">
        <Button label="Copy" style={CopyButtonStyles} />
      </div>
    </form>
  );
}

// JS Styles
const CopyButtonStyles = { backgroundColor: '#475DED', color: '#EEC643' };

export default Form;
