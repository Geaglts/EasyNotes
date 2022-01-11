import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { AiFillCloseSquare, AiOutlineCloseCircle } from 'react-icons/ai';
import 'styles/Containers/Modal.scss';

import { Context } from '../Context';

const Modal = ({ children, active = false, changeStatus = () => {}, fullScreen = false }) => {
  const { darkTheme } = useContext(Context);

  const themeClass = darkTheme ? ' dark' : ' light';

  if (!active) return null;

  if (fullScreen) {
    return (
      <section className="FullScreen_Modal">
        <button className="FullScreen_Modal-Close" onClick={changeStatus}>
          <AiOutlineCloseCircle className="FullScreen_Modal-Close-Icon" />
          Cancelar
        </button>
        {children}
      </section>
    );
  }

  return createPortal(
    <div className={`Modal${themeClass}`}>
      <div className="Modal__Content">
        <AiFillCloseSquare className="Modal__Content--Close" onClick={changeStatus} />
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
