import React, { useRef, useState } from 'react';
import axios from 'axios';

import Modal from '@components/Modal';
import { SimpleInput } from '@components/Input';
import Button from '@components/Button';

import FormControl from '@utils/classes/FormControl';

import styles from '@styles/Containers/CheckNotePin.module.scss';

const CheckNotePin = ({ pin, children, visibility, changeVisibility }) => {
  const [callback, setCallback] = useState(null);
  const [showError, setShowError] = useState(false);
  const [forgotPin, setForgotPin] = useState(false);
  const pinInput = useRef(null);

  const toggleFotgotPin = () => {
    setForgotPin(!forgotPin);
  };

  const showValidation = (callback) => (evt) => {
    if (!pin) {
      callback();
    } else {
      changeVisibility();
      setCallback({ run: callback });
    }
  };

  const verifyPin = async (event) => {
    event.preventDefault();
    const inputValue = pinInput.current.value;
    let hasAuthorization = false;
    if (!forgotPin) {
      const { pin: decrypedPin } = FormControl.decryptData({ pin });
      hasAuthorization = inputValue === decrypedPin;
    } else {
      try {
        const { data } = await axios.post('/api/v1/users/password-validation', {
          password: inputValue,
        });
        hasAuthorization = data;
      } catch {}
    }
    if (hasAuthorization) {
      changeVisibility();
      //toggleFotgotPin();
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
      <Modal
        title={`Verificación  de ${forgotPin ? 'Contraseña' : 'PIN'}`}
        active={visibility}
        changeStatus={changeVisibility}
      >
        <form className={styles.Container} onSubmit={verifyPin}>
          <SimpleInput
            type={'password'}
            ref={pinInput}
            placeholder={`Ingresa ${
              forgotPin ? 'tu Contraseña' : 'el PIN de tu Nota'
            }`}
            isPassword={true}
          />
          <Button label="Abrir" onClick={verifyPin} classNames={[styles.Button]} />
          <button
            type="button"
            className={styles.ButtonForgotPin}
            onClick={toggleFotgotPin}
          >
            Verificación {forgotPin ? 'con PIN' : 'con Contraseña'}
          </button>
          {showError && <p className={styles.Error}>Este pin es incorrecto</p>}
        </form>
      </Modal>
    </>
  );
};

export default CheckNotePin;
