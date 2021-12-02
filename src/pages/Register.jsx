import React, { useRef, useContext, useState } from 'react';
import 'styles/pages/Register.scss';
import { BsEyeSlash, BsEye } from 'react-icons/bs';

import Toast from 'components/Toast';
import Button from 'components/Button';
import InputForm from 'components/InputForm';

import { Context } from '../Context';

const Register = () => {
  const { darkTheme } = useContext(Context);
  const form = useRef(null);
  const [errorList, setErrorList] = useState(null);

  const themeClass = darkTheme ? ' dark' : ' light';

  const onSubmitForm = (event) => {
    const errors = [];
    event.preventDefault();
    const formData = new FormData(form.current);
    if (formData.get('')) {
    }
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      alias: formData.get('alias'),
      password: formData.get('password'),
      passwordToCompare: formData.get('confirm-password'),
    };
    if (data.password !== data.passwordToCompare) {
      errors.push({ message: '🔒 Las contraseñas no coinciden', type: 'warning' });
      setErrorList(errors);
    } else {
      delete data.passwordToCompare;
      console.log(data);
      form.current.reset();
    }
  };

  return (
    <div className={`Register${themeClass}`}>
      <h1>Registro</h1>
      <p>Un gusto que formes parte de este proyecto</p>
      <form ref={form} className="Register__Form" onSubmit={onSubmitForm}>
        <div className="FullName__Div">
          <InputForm name="firstName" labelName="Nombres:" placeholder="Nombres" required />
          <InputForm name="lastName" labelName="Apellidos:" placeholder="Apellidos" required />
        </div>
        <InputForm name="alias" labelName="Nombre de usuario:" placeholder="Nombre de usuario" />
        <InputForm name="email" labelName="Correo electrónico:" placeholder="Correo electronico" type="email" required />
        <InputForm name="password" labelName="Contraseña:" placeholder="Contraseña" isPassword required />
        <InputForm name="confirm-password" labelName="Repite tu contraseña:" isPassword placeholder="Repite tu contraseña" required />
        <Button label="Registrarme" type="submit" />
      </form>
      {errorList && <Toast messages={errorList} />}
    </div>
  );
};

export default Register;
