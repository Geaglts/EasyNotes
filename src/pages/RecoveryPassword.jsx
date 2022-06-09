import React, { useRef, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BiSend } from 'react-icons/bi';
import Axios from 'axios';
import { Helmet } from 'react-helmet';

import { Context } from 'context';

import InputForm from 'components/InputForm';
import Toast from 'components/Toast';
import { ChangePassword } from '@fragments/RecoveryPassword/ChangePassword';

import useFormError from 'hooks/useFormError';

import { APP_NAME } from '@constants';
import FormControl from 'utils/classes/FormControl';

import '@styles/pages/RecoveryPassword.scss';

const RecoveryPassword = () => {
  const { theme } = useContext(Context);
  const [query] = useSearchParams();
  const { addErrors, formErrors } = useFormError();
  const form = useRef(null);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const { values } = new FormControl(form.current);
    const { data } = await Axios.post('/auth/recovery-password', values);
    if (data.errorCode) {
      return;
    }
    form.current.reset();
    addErrors([{ message: '📩 Te hemos enviado un correo', type: 'info' }]);
  };

  if (query.get('token')) {
    return <ChangePassword token={query.get('token')} />;
  }

  return (
    <>
      <Helmet>
        <title>{APP_NAME} | Recuperación de contraseña</title>
      </Helmet>
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
        <Toast messages={formErrors} />
      </div>
    </>
  );
};

export default RecoveryPassword;
