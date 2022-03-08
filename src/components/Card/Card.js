import React from 'react';
import { Container, StatTitle, StatContent, CardButtonLabel, CardTitle as BasicCardTitle, CardSubTitle as BasicCardSubtitle } from './styles';

export const CardContainer = ({ children, ...props }) => <Container {...props}>{children}</Container>;
export const CardTitle = ({ label = '' }) => <BasicCardTitle>{label}</BasicCardTitle>;
export const CardSubtitle = ({ label = '' }) => <BasicCardSubtitle>{label}</BasicCardSubtitle>;

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
