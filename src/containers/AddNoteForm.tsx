import { MdSpa } from 'react-icons/md';

import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import useForm from '../Hooks/useForm';

import '../styles/Containers/AddNoteForm.scss';

function Form() {
  const initialState = {
    title: '',
    content: '',
  };

  const submit = (values: typeof initialState) => {
    console.log(values);
  };

  const { handleSubmit, propsByName } = useForm({ initialState, submit });

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
const CopyButtonStyles = { backgroundColor: '#475DED', color: '#EEC643' };

export default Form;
