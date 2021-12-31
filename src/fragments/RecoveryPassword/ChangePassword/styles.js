import styled from 'styled-components';

export const Content = styled.div`
  width: 350px;
  color: var(${({ theme }) => (theme === 'dark' ? '--white' : '--dark')});
  font-size: 14pt;
  text-align: center;
  display: grid;
  row-gap: 8px;
`;

export const Form = styled.form`
  display: grid;
  row-gap: 12px;
`;

export const Button = styled.button`
  height: 40px;
  border-radius: 4px;
  border: none;
  font-size: 12pt;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  background-color: var(--primary);
  color: var(--white);
  transition: all 300ms ease;

  &:hover {
    transition: all 200ms ease;
    color: var(--primary);
    background-color: var(--white);
  }
`;
