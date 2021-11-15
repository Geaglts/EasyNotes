import React from 'react';
import 'styles/Components/InputForm.scss';

const InputForm = ({ labelName = 'Input', ...rest }) => {
  return (
    <label className="InputLabel">
      {labelName}
      <input className="InputForm" {...rest} />
    </label>
  );
};

export default InputForm;
