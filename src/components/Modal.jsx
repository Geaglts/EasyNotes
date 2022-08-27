import React, { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AiFillCloseSquare } from 'react-icons/ai';

import styles from '@styles/Components/Modal.module.scss';

import { Context } from '../Context';

const Modal = ({ children, active = false, changeStatus = () => {}, title }) => {
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

  return createPortal(
    <div
      className={`${styles.container} ${styles[theme]}`}
      onClick={closeModalOnClickOutside}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <AiFillCloseSquare className={styles.close_icon} onClick={changeStatus} />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
