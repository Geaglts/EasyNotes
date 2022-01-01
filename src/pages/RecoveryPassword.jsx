import React, { useRef, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BiSend } from 'react-icons/bi';
import Axios from 'axios';
import { Context } from 'context';

import 'styles/pages/RecoveryPassword.scss';

import InputForm from 'components/InputForm';
import { ChangePassword } from '@fragments/RecoveryPassword/ChangePassword';

import FormControl from 'utils/classes/FormControl';

const RecoveryPassword = () => {
  const { theme } = useContext(Context);
  const [query] = useSearchParams();
  const form = useRef(null);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const API_URL = `${process.env.API_URL}/auth/recovery-password`;
    const { values } = new FormControl(form.current);
    const { data } = await Axios.post(API_URL, values);
  };

  if (query.get('token')) {
    return <ChangePassword token={query.get('token')} />;
  }

  return (
    <div className={`RecoveryPassword ${theme}`}>
      <p className="RecoveryPassword__description">Proporciónanos tu correo electrónico para que puedas recuperar tu contraseña 🌞</p>
      <form ref={form} onSubmit={onSubmitForm} className="RecoveryPassword__form">
        <InputForm labelName="" name="email" placeholder="correo electronico" />
        <button type="submit">
          <BiSend />
        </button>
      </form>
      <div className="RecoveryPassword__bottom_nav">
        <Link to="/">Regresar al inicio</Link>
        <p>
          <Link to="/login">Iniciar sesión</Link> o <Link to="/register">Registrarme</Link>
        </p>
      </div>
    </div>
  );
};

export default RecoveryPassword;
