import { MdSpa } from 'react-icons/md';

import Button from '../components/Button';
import Input from '../components/Input';

function Form() {
  return (
    <div>
      <Button label="Add Resume" />
      <Input Icon={<MdSpa />} placeholder="Note Title" />
    </div>
  );
}

export default Form;
