import React, { useContext } from 'react';
import '@styles/Components/MultiSelect/MultiSelectOptions.scss';

import { Context } from '@context';

const MultiSelectOptions = ({ children, handleShowedContent }) => {
  const { theme } = useContext(Context);

  return (
    <div className={`MultiSelectOptions ${theme}`}>
      <span className="MultiSelectOptions-close" onClick={handleShowedContent}>
        x
      </span>
      {children}
    </div>
  );
};

export default MultiSelectOptions;
