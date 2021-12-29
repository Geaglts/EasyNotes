import React, { useRef, useContext } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'styles/pages/Register.scss';

import Toast from 'components/Toast';
import Button from 'components/Button';
import InputForm from 'components/InputForm';

import { Context } from '../Context';

import useFormError from 'hooks/useFormError';
import FormControl from 'utils/classes/FormControl';
import validate from 'utils/validate';
import { registerSchema } from 'schemas/register.schema';

const Register = () => {
  const navigate = useNavigate();
  const { darkTheme } = useContext(Context);
  const { formErrors, addErrors } = useFormError();
  const form = useRef(null);

  const themeClass = darkTheme ? ' dark' : ' light';

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const { values: data } = new FormControl(form.current);
      const validatedData = await validate({ schema: registerSchema, data });

      if (!validatedData.approved) {
        addErrors([{ message: validatedData.message, type: 'danger' }]);
        return;
      } else if (data.password !== data.confirmPassword) {
        addErrors([{ message: '🔒 Las contraseñas no coinciden', type: 'danger' }]);
        return;
      } else {
        const API_URL = `${process.env.API_URL}/api/v1/users/`;
        delete data.confirmPassword;
        const response = await Axios.post(API_URL, data);
        if (response.data.statusCode >= 300) {
          addErrors([{ message: '🌞 Ya existe una usuaria con esta cuenta', type: 'info' }]);
          return;
        }
        form.current.reset();
        navigate('/email-sended');
      }
    } catch (error) {
      // console.log(error);
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
        <InputForm name="confirmPassword" labelName="Repite tu contraseña:" isPassword placeholder="Repite tu contraseña" required />
        <Button label="Registrarme" type="submit" />
      </form>
      <Toast messages={formErrors} />
    </div>
  );
};

export default Register;
