import React, { useRef } from 'react';
import Modal from 'components/Modal';
import { SimpleInput } from 'components/Input';
import Button from 'components/Button';

import styles from 'styles/Containers/CheckNotePin.module.scss';

const CheckNotePin = ({ visible, onChangeVisibility, onSubmit }) => {
  const pinInput = useRef(null);

  return (
    <Modal title="Verificación de PIN" active={visible} changeStatus={onChangeVisibility}>
      <div className={styles.Container}>
        <SimpleInput ref={pinInput} placeholder="Ingresa el PIN de tu Nota" />
        <Button
          label="Abrir"
          onClick={() => {
            onSubmit(pinInput.current.value);
          }}
          classNames={[styles.Button]}
        />
      </div>
    </Modal>
  );
};

export default CheckNotePin;
