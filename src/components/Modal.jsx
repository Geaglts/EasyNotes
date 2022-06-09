import React, { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AiFillCloseSquare, AiOutlineCloseCircle } from 'react-icons/ai';
import '@styles/Containers/Modal.scss';

import { Context } from '../Context';

const Modal = ({ children, active = false, changeStatus = () => {}, fullScreen = false, title }) => {
  const { theme } = useContext(Context);

  useEffect(() => {
    const closeModalOnKeyDown = (evt) => {
      const key = evt.code;
      if (key === 'Escape' && active) {
        changeStatus();
      }
    };
    window.addEventListener('keydown', closeModalOnKeyDown);
    return () => {
      window.removeEventListener('keydown', closeModalOnKeyDown);
    };
  }, [active]);

  const closeModalOnClickOutside = (evt) => {
    const targetClass = evt.target.classList.value.replace(/ /g, '-').toLowerCase();
    if (targetClass === 'modal-dark' && active) {
      changeStatus();
    }
  };

  if (!active) return null;

  if (fullScreen) {
    return (
      <section className="FullScreen_Modal">
        <div className="FullScreen_Modal_Content">
          <button className="FullScreen_Modal-Close" onClick={changeStatus}>
            <AiOutlineCloseCircle className="FullScreen_Modal-Close-Icon" />
            Cancelar [esc]
          </button>
          {children}
        </div>
      </section>
    );
  }

  return createPortal(
    <div className={`Modal ${theme}`} onClick={closeModalOnClickOutside}>
      <div className="Modal__Content">
        <div className="Modal__Content_Header">
          {title && <h2 className="Modal__Content_Header_Title">{title}</h2>}
          <AiFillCloseSquare className="Modal__Content_Header--Close" onClick={changeStatus} />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
