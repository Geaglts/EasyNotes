import React, { useContext } from 'react';
import { Container, StatTitle, StatContent, CardButtonLabel, CardTitle as BasicCardTitle, CardSubTitle as BasicCardSubtitle } from './styles';

import { Context } from 'context';

export const CardContainer = ({ children, ...props }) => {
  const { theme } = useContext(Context);
  return (
    <Container {...props} theme={theme}>
      {children}
    </Container>
  );
};

export const CardTitle = ({ label = '' }) => {
  const { theme } = useContext(Context);
  return <BasicCardTitle theme={theme}>{label}</BasicCardTitle>;
};

export const CardSubtitle = ({ label = '' }) => {
  const { theme } = useContext(Context);
  return <BasicCardSubtitle theme={theme}>{label}</BasicCardSubtitle>;
};

export const StatCard = ({ children }) => {
  return <Container>{children}</Container>;
};

export const StatCardTitle = ({ label }) => {
  return <StatTitle>{label}</StatTitle>;
};

export const StatCardContent = ({ label }) => {
  return <StatContent>{label}</StatContent>;
};

export const CardButton = ({ label, onClick = () => {} }) => {
  return (
    <Container as="button" onClick={onClick}>
      <CardButtonLabel>{label}</CardButtonLabel>
    </Container>
  );
};
