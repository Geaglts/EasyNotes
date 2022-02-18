import React, { useState } from 'react';
import 'styles/Components/MultiSelect/MultiSelect.scss';

export const MultiSelect = ({ title = '', children }) => {
  const [isShowed, setIsShowed] = useState(false);

  const handleShowedContent = () => {
    setIsShowed(!isShowed);
  };

  return (
    <section className="MultiSelect">
      <button className="MultiSelect_BtnTitle" onClick={handleShowedContent}>
        {title}
      </button>
      {isShowed && (
        <div className="MultiSelect_DivOptions">
          <span className="MultiSelect_DivOptions-close" onClick={handleShowedContent}>
            x
          </span>
          {children}
        </div>
      )}
    </section>
  );
};
