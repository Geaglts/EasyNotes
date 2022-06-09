import React, { useState, useContext } from 'react';
import { BsGearFill } from 'react-icons/bs';
import '@styles/Components/MultiSelect/MultiSelect.scss';

import { Context } from 'context';

const MultiSelect = ({ title = '', children, items = 0, cleanSelection = () => {}, cb, onClickConfig = () => {} }) => {
  const [isShowed, setIsShowed] = useState(false);
  const { theme } = useContext(Context);

  const handleShowedContent = () => {
    if (cb && isShowed) {
      cb();
    }
    setIsShowed(!isShowed);
  };

  return (
    <section className={`MultiSelect ${theme}`}>
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
        <div className="MultiSelect_DivContent">
          {children({ handleShowedContent })}
          <div className="MultiSelect-ConfigIconContainer">
            <BsGearFill className="MultiSelect-ConfigIcon" onClick={onClickConfig} />
          </div>
        </div>
      )}
    </section>
  );
};

export default MultiSelect;
