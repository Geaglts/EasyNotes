import React, { useState, useContext } from 'react';
import 'styles/Components/MultiSelect/MultiSelectOption.scss';

import { Context } from 'context';

const MultiSelectOption = ({ id, children, currentSelected = [], handleChange }) => {
  const [isChecked, setIsChecked] = useState(currentSelected.includes(id));
  const { theme } = useContext(Context);

  const handleCheck = (event) => {
    setIsChecked(event.target.checked);
    handleChange(event);
  };

  return (
    <div className={`MultiSelectOption ${theme}`}>
      <input type="checkbox" checked={isChecked} onChange={handleCheck} />
      <p className={`MultiSelectOption_Label-${isChecked}`}>{children}</p>
    </div>
  );
};

export default MultiSelectOption;
