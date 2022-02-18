import React, { useState } from 'react';
import 'styles/Components/MultiSelect/MultiSelect.scss';

export const MultiSelect = ({ title = '', children, items = 0, cleanSelection = () => {} }) => {
  const [isShowed, setIsShowed] = useState(false);

  const handleShowedContent = () => {
    setIsShowed(!isShowed);
  };

  return (
    <section className="MultiSelect">
      <div className="MultiSelect_DivHeader">
        <button className="MultiSelect_BtnTitle" onClick={handleShowedContent}>
          {title}
        </button>
        {items > 0 && (
          <button className="MultiSelect_BtnClean" onClick={cleanSelection}>
            limpiar
          </button>
        )}
      </div>
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
