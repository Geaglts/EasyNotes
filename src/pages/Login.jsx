import React, { useRef, useContext, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

import 'styles/pages/Login.scss';

import InputForm from 'components/InputForm';
import Button from 'components/Button';
import Toast from 'components/Toast';
import { Loading } from 'components/Loading';
import { Layout } from 'containers/Layout/Layout';

import loginLightImage from 'assets/images/login.svg';
import loginDarkImage from 'assets/images/login__dark.svg';

import { Context } from '../Context';

import validate from 'utils/validate';
import useformError from 'hooks/useFormError';
import { loginSchema } from 'schemas/login.schema';

const Login = () => {
  const form = useRef(null);
  const { darkTheme, changeUserStatus, hasUser } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { formErrors, addErrors } = useformError();

  const themeClass = darkTheme ? ' dark' : ' light';

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(form.current);
      const data = { email: formData.get('email'), password: formData.get('password') };
      const validatedData = await validate({ schema: loginSchema, data });
      if (!validatedData.approved) {
        addErrors([{ message: validatedData.message, type: 'danger' }]);
        return;
      }
      const response = await axios.post('/auth/login', validatedData.data);
      if (response.data.errorCode) {
        const { errorCode, message } = response.data;
        switch (errorCode) {
          case 1: {
            addErrors([{ message, type: 'info' }]);
            return;
          }
          case 3: {
            addErrors([{ message, type: 'danger' }]);
            return;
          }
        }
      }
      changeUserStatus(response.data.body.token);
      navigate('/dashboard');
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout center>
        <Loading />
      </Layout>
    );
  }

  if (hasUser) return <Navigate to="/dashboard" />;

  return (
    <>
      <div className={`Login${themeClass}`}>
        <section className="Login__Left">
          <div className="Login__Form--container">
            <h1>Ingresa tus datos</h1>
            <p>Bienvenido de vuelta</p>
            <form ref={form} onSubmit={onSubmitForm}>
              <InputForm labelName="Correo electronico o Nombre de usuario:" name="email" type="text" placeholder="correo" required />
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
