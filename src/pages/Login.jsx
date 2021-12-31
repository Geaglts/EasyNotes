import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'styles/pages/Login.scss';

import InputForm from 'components/InputForm';
import Button from 'components/Button';
import Toast from 'components/Toast';

import loginLightImage from 'assets/images/login.svg';
import loginDarkImage from 'assets/images/login__dark.svg';

import { Context } from '../Context';

import validate from 'utils/validate';
import useformError from 'hooks/useFormError';
import { loginSchema } from 'schemas/login.schema';

const Login = () => {
  const { darkTheme } = useContext(Context);
  const { formErrors, addErrors } = useformError();
  const form = useRef(null);

  const themeClass = darkTheme ? ' dark' : ' light';

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(form.current);
      const data = { email: formData.get('email'), password: formData.get('password') };
      const validatedData = await validate({ schema: loginSchema, data });
      if (!validatedData.approved) {
        const error = [{ message: validatedData.message, type: 'danger' }];
        addErrors(error);
        return;
      }
      const response = await axios.post('/auth/login', validatedData.data);
      if (response.data.message === 'You need to activate your account, please check your email.') {
        const error = [{ message: 'Necesitas activar tu cuenta, revisa tu correo.', type: 'info' }];
        addErrors(error);
        return;
      } else if (response.data.message === 'Unauthorized') {
        const error = [{ message: '🔒 Usuario y/o contraseña incorrecta', type: 'info' }];
        addErrors(error);
        return;
      } else {
        console.log(response.data);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <>
      <div className={`Login${themeClass}`}>
        <section className="Login__Left">
          <div className="Login__Form--container">
            <h1>Ingresa tus datos</h1>
            <p>Bienvenido de vuelta</p>
            <form ref={form} onSubmit={onSubmitForm}>
              <InputForm labelName="Correo electronico:" name="email" type="email" placeholder="correo" required />
              <InputForm labelName="Contraseña:" name="password" placeholder="contraseña" isPassword required />
              <Button label="Iniciar sesion" type="submit" />
              <Link to="/register" className="register-link">
                Quiero registrarme
              </Link>
            </form>
            <Link to="/recovery-password" className="LinkToRecoveryPassword">
              ¿Se te olvido tu contraseña?
            </Link>
          </div>
        </section>
        <section className="Login__Right">
          <img src={darkTheme ? loginDarkImage : loginLightImage} alt="login easy notes" />
        </section>
      </div>
      <Toast messages={formErrors} />
    </>
  );
};

export default Login;
