import React, { useRef, useContext } from 'react';
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

  const onSubmitForm = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    console.log(formData);
  };

  return (
    <div className={`Login${themeClass}`}>
      <section className="Login__Left">
        <div className="Login__Form--container">
          <h1>Ingresa tus datos</h1>
          <p>Bienvenido de vuelta</p>
          <form ref={form} onSubmit={onSubmitForm}>
            <InputForm labelName="Correo electronico:" type="email" placeholder="correo" required />
            <InputForm labelName="Contraseña" type="password" placeholder="contraseña" required />
            <Button label="Iniciar sesion" type="submit" />
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
