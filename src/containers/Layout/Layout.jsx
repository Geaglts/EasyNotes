import React, { useContext } from 'react';

import { Container, Content } from './styles';

import { Context } from 'context';

export const Layout = ({ children, center, ...rest }) => {
  const { theme } = useContext(Context);
  return (
    <Container theme={theme}>
      <Content center={center} {...rest}>
        {children}
      </Content>
    </Container>
  );
};
