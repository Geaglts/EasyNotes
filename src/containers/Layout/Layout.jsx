import React, { useContext } from 'react';

import { Container } from './styles';

import { Context } from 'context';

export const Layout = ({ children, center, ...rest }) => {
  const { theme } = useContext(Context);
  return (
    <Container center={center} theme={theme} {...rest}>
      {children}
    </Container>
  );
};
