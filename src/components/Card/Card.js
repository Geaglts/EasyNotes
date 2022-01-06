import React from 'react';
import { Container, StatTitle, StatContent, CardButtonLabel } from './styles';

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
