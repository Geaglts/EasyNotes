import styled, { css } from 'styled-components';
import { colors, fonts } from '@constants';

export const Container = styled.div`
  border: none;
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

  ${(props) => {
    if (props.theme) {
      switch (props.theme) {
        case 'dark': {
          return css`
            border-top: 3px solid ${colors.PRIMARY};
            background-color: ${colors.LIGHT_DARK};
          `;
        }
        case 'light': {
          return css`
            border-top: 3px solid ${colors.GRAY};
            background-color: ${colors.LIGHT_GRAY};
          `;
        }
        default: {
          return css`
            background-color: ${colors.WHITE};
          `;
        }
      }
    }
  }}

  :hover {
    transition: transform 200ms ease;
    transform: scale(1.01);
  }

  @media (max-width: 420px) {
    --size: 80px;
    padding: 4px;
  }
`;

export const CardTitle = styled.h4`
  font-size: 15pt;
  font-weight: bold;
  text-transform: capitalize;
  ${(props) => {
    if (props.theme) {
      switch (props.theme) {
        case 'dark': {
          return css`
            color: ${colors.PRIMARY};
          `;
        }
        case 'light': {
          return css`
            color: ${colors.PRIMARY};
          `;
        }
      }
    }
  }}
`;

export const CardSubTitle = styled.p`
  font-size: 8pt;
  text-transform: uppercase;
  font-family: ${fonts.secondary};
  ${(props) => {
    if (props.theme) {
      switch (props.theme) {
        case 'dark': {
          return css`
            color: ${colors.GRAY};
          `;
        }
        case 'light': {
          return css`
            color: ${colors.LIGHT_DARK};
          `;
        }
      }
    }
  }}
`;

export const StatTitle = styled.p`
  font-size: 10pt;
  font-weight: bold;

  @media (max-width: 420px) {
    font-size: 11pt;
    line-height: 1;
    margin-top: 4px;
  }
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

  @media (max-width: 420px) {
    font-size: 10pt;
  }
`;
