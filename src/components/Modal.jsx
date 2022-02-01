import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { AiFillCloseSquare, AiOutlineCloseCircle } from 'react-icons/ai';
import 'styles/Containers/Modal.scss';

import { Context } from '../Context';

const Modal = ({ children, active = false, changeStatus = () => {}, fullScreen = false, title }) => {
  const { darkTheme } = useContext(Context);

  const themeClass = darkTheme ? ' dark' : ' light';

  if (!active) return null;

  if (fullScreen) {
    return (
      <section className="FullScreen_Modal">
        <div className="FullScreen_Modal_Content">
          <button className="FullScreen_Modal-Close" onClick={changeStatus}>
            <AiOutlineCloseCircle className="FullScreen_Modal-Close-Icon" />
            Cancelar
          </button>
          {children}
        </div>
      </section>
    );
  }

  return createPortal(
    <div className={`Modal${themeClass}`}>
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
