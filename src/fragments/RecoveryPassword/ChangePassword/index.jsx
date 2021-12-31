import React, { useRef, useContext } from 'react';
import { Content, Form, Button } from './styles';

import { Context } from 'context';

import { Layout } from 'containers/Layout/Layout';
import InputForm from 'components/InputForm';

import FormControl from 'utils/classes/FormControl';
import { isNotEquals } from 'utils/isFunctions';

export const ChangePassword = () => {
  const { theme } = useContext(Context);
  const form = useRef(null);

  const onSubmitChangePassword = (e) => {
    e.preventDefault();
    const { values } = new FormControl(form.current);
    if (isNotEquals(values.newPassword, values.confirmPassword)) {
      console.log('no son iguales');
    } else {
      console.log(values);
    }
  };

  return (
    <Layout center>
      <Content theme={theme}>
        <h2>Cambio de contraseña</h2>
        <p>Escribe tu nueva contraseña, como minimo debe tener 8 caracteres</p>
        <Form ref={form} onSubmit={onSubmitChangePassword} className="ChangePassword__Form">
          <InputForm name="newPassword" placeholder="Ingresa tu contraseña" isPassword />
          <InputForm name="confirmPassword" placeholder="Repite tu contraseña" isPassword />
          <Button>Cambiar contraseña</Button>
        </Form>
      </Content>
    </Layout>
  );
};
