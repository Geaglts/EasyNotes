import React, { useContext, Children, cloneElement } from 'react';

import { Container } from './styles';

import { Context } from 'context';
import { childrensWithProps } from 'utils/childrensWithProps';

export const Layout = ({ children, parent, center }) => {
  const { theme } = useContext(Context);

  if (parent) {
    const childrenWithParentClass = Children.map(children, (child) => {
      return cloneElement(child, childrensWithProps({ ...child.props }, { className: parent }));
    });

    return (
      <Container center={center} theme={theme}>
        {childrenWithParentClass}
      </Container>
    );
  }

  return (
    <Container center={center} theme={theme}>
      {children}
    </Container>
  );
};
