import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import InputForm from 'components/InputForm';
import { BiSend } from 'react-icons/bi';

import 'styles/pages/RecoveryPassword.scss';

import { Context } from 'context';
import FormControl from 'utils/classes/FormControl';

const RecoveryPassword = () => {
  const { theme } = useContext(Context);
  const form = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const { values } = new FormControl(form.current);
    console.log(values);
  };

  return (
    <div className={`RecoveryPassword ${theme}`}>
      <p className="description">Proporciónanos tu correo electrónico para que puedas recuperar tu contraseña 🌞</p>
      <form ref={form} onSubmit={onSubmitForm} className="form">
        <InputForm labelName="" name="email" placeholder="correo electronico" />
        <button type="submit">
          <BiSend />
        </button>
      </form>
      <div className="bottom_nav">
        <Link to="/">Regresar al inicio</Link>
        <p>
          <Link to="/login">Iniciar sesión</Link> o <Link to="/register">Registrarme</Link>
        </p>
      </div>
    </div>
  );
};

export default RecoveryPassword;
