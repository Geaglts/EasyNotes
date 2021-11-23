import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { AiFillCloseSquare } from 'react-icons/ai';
import 'styles/Containers/Modal.scss';

import { Context } from '../Context';

const Modal = ({ children, active = false, changeStatus = () => {} }) => {
  const { darkTheme } = useContext(Context);

  console.log(active);

  const themeClass = darkTheme ? ' dark' : ' light';

  if (!active) return null;

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
