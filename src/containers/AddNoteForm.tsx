import { MdSpa } from 'react-icons/md';

import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';

function Form() {
  return (
    <div>
      <Button label="Add Resume" />
      <Input Icon={<MdSpa />} placeholder="Note Title" />
      <TextArea placeholder="Note Content" rows={5} />
      <Button
        label="Copy"
        style={{ backgroundColor: '#475DED', color: '#EEC643' }}
      />
    </div>
  );
}

export default Form;
