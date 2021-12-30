import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { BiErrorCircle, BiSend, BiHomeAlt } from 'react-icons/bi';

import 'styles/fragments/ActivateAccount/TokenExpired.scss';

import { Context } from 'context';

import InputForm from 'components/InputForm';
import Button from 'components/Button';
import Toast from 'components/Toast';

import useFormError from 'hooks/useFormError';

import FormControl from 'utils/classes/FormControl';

const TokenExpired = () => {
  const { theme } = useContext(Context);
  const form = useRef(null);
  const { formErrors, addErrors } = useFormError();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `${process.env.API_URL}/auth/resend-activation-email`;
      const { values } = new FormControl(form.current);
      const { data } = await Axios.post(URL, values);
      if (data.error) {
        addErrors([{ message: 'El correo no es valido', type: 'danger' }]);
        return;
      }
      addErrors([{ message: 'Te hemos enviado el correo nuevamente 😄', type: 'success' }]);
    } catch (error) {
      //console.log(error)
    }
  };

  return (
    <div className={`TokenExpired ${theme}`}>
      <BiErrorCircle className="TokenExpired__Icon" />
      <p className="TokenExpired__info">
        Tu token a expirado, pero no te preocupes puedes solicitar uno nuevo, solo vuelve a ingresar tu correo electrónico.
      </p>
      <form onSubmit={onSubmit} ref={form} className="TokenExpired__form">
        <InputForm name="email" labelName="" placeholder="correo electronico" type="email" required />
        <Button type="submit" label={<BiSend />} />
      </form>
      <Link to="/" className="TokenExpired__LinkToHome">
        <BiHomeAlt />
        Ir al inicio
      </Link>
      <Toast messages={formErrors} />
    </div>
  );
};

export default TokenExpired;
