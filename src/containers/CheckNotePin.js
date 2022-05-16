import React, { useRef, useState } from 'react';
import Modal from 'components/Modal';
import { SimpleInput } from 'components/Input';
import Button from 'components/Button';
import FormControl from 'utils/classes/FormControl';

import styles from 'styles/Containers/CheckNotePin.module.scss';

const CheckNotePin = ({ pin, children, visibility, changeVisibility }) => {
  const [callback, setCallback] = useState(null);
  const [showError, setShowError] = useState(false);
  const pinInput = useRef(null);

  const showValidation = (callback) => (evt) => {
    if (!pin) {
      callback();
    } else {
      changeVisibility();
      setCallback({ run: callback });
    }
  };

  const verifyPin = (event) => {
    event.preventDefault();
    const { pin: decrypedPin } = FormControl.decryptData({ pin });
    if (pinInput.current.value === decrypedPin) {
      changeVisibility();
      callback.run();
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  return (
    <>
      {children(showValidation)}
      <Modal title="Verificación de PIN" active={visibility} changeStatus={changeVisibility}>
        <div className={styles.Container}>
          <SimpleInput ref={pinInput} placeholder="Ingresa el PIN de tu Nota" />
          <Button label="Abrir" onClick={verifyPin} classNames={[styles.Button]} />
          {showError && <p className={styles.Error}>Este pin es incorrecto</p>}
        </div>
      </Modal>
    </>
  );
};

export default CheckNotePin;
