import { useRef, useContext, useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import InputForm from '@components/InputForm';
import Button from '@components/Button';
import Toast from '@components/Toast';
import { Loading } from '@components/Loading';
import { Layout } from '@containers/Layout/Layout';
import LoginWith from '@components/LoginWith';

import loginLightImage from '@assets/images/login.svg';
import loginDarkImage from '@assets/images/login__dark.svg';
import googleIcon from '@icons/google-icon.svg';

import { Context } from '@context';

import { BROWSER_REMEMBER_USER_NAME, APP_NAME } from '@constants';
import { browserStorage } from '@storage';
import validate from '@utils/validate';
import useformError from '@hooks/useFormError';
import { loginSchema } from '@schemas/login.schema';
import { isEmpty } from '@utils/isFunctions';

import '@styles/pages/Login.scss';

const Login = () => {
  const form = useRef(null);
  const rememberUserCheckboxRef = useRef(null);
  const { darkTheme, changeUserStatus, hasUser } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(
    browserStorage.get(BROWSER_REMEMBER_USER_NAME) || ''
  );
  const navigate = useNavigate();
  const { formErrors, addErrors } = useformError();

  const themeClass = darkTheme ? ' dark' : ' light';

  useEffect(() => {
    if (!isEmpty(email)) {
      browserStorage.set(BROWSER_REMEMBER_USER_NAME, email);
    }
  }, [email]);

  const onChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(form.current);
      const data = {
        email: formData.get('email').trim(),
        password: formData.get('password'),
      };
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
      const defaultError = {
        message: '🔐 Usuario y/o Contraseña incorrecta',
        type: 'danger',
      };
      addErrors([defaultError]);
    } finally {
      setLoading(false);
    }
  };

  const onChangeRememberUser = (evt) => {
    const checkboxValue = evt.target.checked;
    if (!checkboxValue) {
      browserStorage.delete(BROWSER_REMEMBER_USER_NAME);
    } else {
      if (!isEmpty(email)) {
        browserStorage.set(BROWSER_REMEMBER_USER_NAME, email);
      }
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
    <div className={`Login_Container_${themeClass.trim()}`}>
      <Helmet>
        <title>{APP_NAME} | Inicio de sesión</title>
      </Helmet>
      <div className={`Login${themeClass}`}>
        <section className="Login__Left">
          <div className="Login__Form--container">
            <h1>Ingresa tus datos</h1>
            <p>Bienvenido de vuelta</p>
            <form ref={form} onSubmit={onSubmitForm}>
              <InputForm
                labelName="Correo electronico o Nombre de usuario:"
                name="email"
                type="text"
                placeholder="correo"
                onChange={onChangeEmail}
                defaultValue={email}
                autoComplete="off"
                required
              />
              <InputForm
                labelName="Contraseña:"
                name="password"
                placeholder="contraseña"
                isPassword
                required
              />
              <div className="Login__Form--RememberUser">
                <input
                  ref={rememberUserCheckboxRef}
                  type="checkbox"
                  onChange={onChangeRememberUser}
                  id="remember-user"
                  defaultChecked={!isEmpty(email)}
                />
                <label htmlFor="remember-user">Recordar Usuario</label>
              </div>
              <Button label="Iniciar sesión" type="submit" />
              <LoginWith
                to={`${process.env.API_URL}/auth/google`}
                provider="google"
                providerLogo={googleIcon}
              />
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
          <img
            src={darkTheme ? loginDarkImage : loginLightImage}
            alt="login easy notes"
          />
        </section>
      </div>
      <Toast messages={formErrors} />
    </div>
  );
};

export default Login;
