import React, { useState } from 'react';
import 'styles/Components/MultiSelect/MultiSelect.scss';

const MultiSelect = ({ title = '', children, items = 0, cleanSelection = () => {}, cb }) => {
  const [isShowed, setIsShowed] = useState(false);

  const handleShowedContent = () => {
    if (cb && isShowed) {
      cb();
    }
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
      {isShowed && <div className="MultiSelect_DivContent">{children({ handleShowedContent })}</div>}
    </section>
  );
};

export default MultiSelect;
