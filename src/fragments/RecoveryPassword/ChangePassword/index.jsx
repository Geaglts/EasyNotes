import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Content, Form, Button, Error } from './styles';
import Axios from 'axios';

import { Context } from '@context';

import { Layout } from '@containers/Layout/Layout';
import InputForm from '@components/InputForm';

import { changePasswordSchema } from '@schemas/changePassword.schema';

import FormControl from '@utils/classes/FormControl';
import { isNotEquals } from '@utils/isFunctions';
import validate from '@utils/validate';

import useError from '@hooks/useError';

export const ChangePassword = ({ token }) => {
  const { theme } = useContext(Context);
  const navigate = useNavigate();
  const { error, showError } = useError();
  const form = useRef(null);

  const onSubmitChangePassword = async (e) => {
    e.preventDefault();
    const { values } = new FormControl(form.current);
    const validation = await validate({
      schema: changePasswordSchema,
      data: { newPassword: values.newPassword },
    });
    if (validation.error) {
      showError(validation.message);
    } else {
      if (isNotEquals(values.newPassword, values.confirmPassword)) {
        showError('Las contraseñas no coinciden');
      }
      delete values.confirmPassword;
      values.token = token;
      const { data } = await Axios.post('/auth/new-password', values);
      if (data.errorCode) {
        switch (data.errorCode) {
          case 4: {
            navigate('/recovery-password');
          }
          case 5:
          default: {
            navigate('/');
          }
        }
      }
      navigate('/login');
    }
  };

  return (
    <Layout center>
      <Content theme={theme}>
        <h2>Cambio de contraseña</h2>
        <p>Escribe tu nueva contraseña, como minimo debe tener 8 caracteres</p>
        <Form
          ref={form}
          onSubmit={onSubmitChangePassword}
          className="ChangePassword__Form"
        >
          <InputForm
            name="newPassword"
            placeholder="Ingresa tu contraseña"
            isPassword
          />
          <InputForm
            name="confirmPassword"
            placeholder="Repite tu contraseña"
            isPassword
          />
          <Button>Cambiar contraseña</Button>
        </Form>
        {error && <Error>{error}</Error>}
      </Content>
    </Layout>
  );
};
