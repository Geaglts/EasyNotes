import React from 'react';
import 'styles/Components/MultiSelect/MultiSelectOptions.scss';

const MultiSelectOptions = ({ children, handleShowedContent }) => {
  return (
    <div className="MultiSelectOptions">
      <span className="MultiSelectOptions-close" onClick={handleShowedContent}>
        x
      </span>
      {children}
    </div>
  );
};

export default MultiSelectOptions;
