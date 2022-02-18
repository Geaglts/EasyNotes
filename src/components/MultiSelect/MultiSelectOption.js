import React, { useState } from 'react';
import 'styles/Components/MultiSelect/MultiSelectOption.scss';

export const MultiSelectOption = ({ label = '' }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="MultiSelectOption">
      <input type="checkbox" checked={isChecked} onChange={handleCheck} />
      <p className={`MultiSelectOption_Label-${isChecked}`}>{label}</p>
    </div>
  );
};
