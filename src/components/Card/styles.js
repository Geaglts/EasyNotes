import styled, { css } from 'styled-components';
import { colors, fonts } from '../../constants';

export const Container = styled.div`
  border: none;
  background-color: var(--light-gray);
  display: inline-block;
  padding: 12px;
  border-radius: 8px;
  transition: transform 300ms ease;

  ${({ size }) => {
    return css`
      --size: ${size ? size : '100px'};
      height: var(--size);
      width: var(--size);
    `;
  }}

  ${({ height, width }) => {
    return height && width
      ? css`
          height: ${height};
          width: ${width};
        `
      : '';
  }}

  :hover {
    transition: transform 200ms ease;
    transform: scale(1.05);
  }
`;

export const CardTitle = styled.h4`
  font-size: 16pt;
  font-weight: bold;
  text-transform: capitalize;
  font-family: ${fonts.secondary};
`;

export const CardSubTitle = styled.p`
  font-size: 8pt;
  color: ${colors.GRAY};
  text-transform: uppercase;
  font-family: ${fonts.secondary};
`;

export const StatTitle = styled.p`
  font-size: 10pt;
  font-weight: bold;
`;

export const StatContent = styled.p`
  font-size: 22pt;
`;

export const CardButtonLabel = styled.p`
  font-size: 12pt;
  font-weight: bold;
  text-align: center;
  font-weight: 900;
  line-height: 1;
  color: var(--dark);
`;
