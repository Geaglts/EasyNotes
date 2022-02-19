import React, { useState } from 'react';
import 'styles/Components/MultiSelect/MultiSelectOption.scss';

const MultiSelectOption = ({ id, children, currentSelected = [], handleChange }) => {
  const [isChecked, setIsChecked] = useState(currentSelected.includes(id));

  const handleCheck = (event) => {
    setIsChecked(event.target.checked);
    handleChange(event);
  };

  return (
    <div className="MultiSelectOption">
      <input type="checkbox" checked={isChecked} onChange={handleCheck} />
      <p className={`MultiSelectOption_Label-${isChecked}`}>{children}</p>
    </div>
  );
};

export default MultiSelectOption;
