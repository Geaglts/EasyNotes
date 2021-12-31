import React, { useContext } from 'react';

import { Container } from './styles';

import { Context } from 'context';

export const Layout = ({ children, center }) => {
  const { theme } = useContext(Context);

  return (
    <Container center={center} theme={theme}>
      {children}
    </Container>
  );
};
