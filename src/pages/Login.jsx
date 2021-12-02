import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'styles/pages/Login.scss';

import InputForm from 'components/InputForm';
import Button from 'components/Button';

import loginLightImage from 'assets/images/login.svg';
import loginDarkImage from 'assets/images/login__dark.svg';

import { Context } from '../Context';

const Login = () => {
  const { darkTheme } = useContext(Context);
  const form = useRef(null);

  const themeClass = darkTheme ? ' dark' : ' light';

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(form.current);
      const API_URL = `${process.env.API_URL}/auth/login`;
      const data = { email: formData.get('email'), password: formData.get('password') };
      const response = await axios.post(API_URL, data);
      if (response.data.statusCode === 401) {
        return alert('Usuario y/o contraseña incorrecta');
      }
    } catch (error) {
      console.log(error);
      console.log('Sorry not sorry, check your data');
    }
  };

  return (
    <div className={`Login${themeClass}`}>
      <section className="Login__Left">
        <div className="Login__Form--container">
          <h1>Ingresa tus datos</h1>
          <p>Bienvenido de vuelta</p>
          <form ref={form} onSubmit={onSubmitForm}>
            <InputForm labelName="Correo electronico:" name="email" type="email" placeholder="correo" required />
            <InputForm labelName="Contraseña" name="password" type="password" placeholder="contraseña" required />
            <Button label="Iniciar sesion" type="submit" />
            <Link to="/register" className="register-link">
              Quero registrarme
            </Link>
          </form>
        </div>
      </section>
      <section className="Login__Right">
        <img src={darkTheme ? loginDarkImage : loginLightImage} alt="login easy notes" />
      </section>
    </div>
  );
};

export default Login;
