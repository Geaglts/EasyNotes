import styled from 'styled-components';

export const Container = styled.div`
  border: none;
  background-color: var(--light-gray);
  display: inline-block;
  height: 100px;
  width: 100px;
  padding: 12px;
  border-radius: 8px;
  transition: transform 300ms ease;

  :hover {
    transition: transform 200ms ease;
    transform: scale(1.05);
  }
`;

export const StatTitle = styled.p`
  font-size: 10pt;
  font-weight: bold;
`;

export const StatContent = styled.p`
  font-size: 22pt;
`;

export const CardButtonLabel = styled.p`
  font-size: 16pt;
  font-weight: bold;
  text-align: center;
  font-weight: 900;
  line-height: 1;
  color: var(--dark);
`;
