import React, { useRef, useContext, useState } from 'react';
import 'styles/pages/Register.scss';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import Button from 'components/Button';
import InputForm from 'components/InputForm';

import { Context } from '../Context';

const Register = () => {
  const { darkTheme } = useContext(Context);
  const form = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const themeClass = darkTheme ? ' dark' : ' light';

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      alias: formData.get('alias'),
      password: formData.get('password'),
    };
    console.log(data);
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
        <div className="Password__Div">
          <InputForm name="password" labelName="Contraseña:" placeholder="Contraseña" type={showPassword ? 'text' : 'password'} required />
          <span onClick={handleShowPassword} className="ShowPassword__Icon">
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </span>
        </div>
        <Button label="Registrarme" type="submit" />
      </form>
    </div>
  );
};

export default Register;
