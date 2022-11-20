import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '@constants';

import { Context } from '@context';

export const Input = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 4px;

  border: 0;
  padding: 0 8px;
  font-size: 12pt;

  ${(props) => {
    if (props.theme) {
      switch (props.theme) {
        case 'dark': {
          return css`
            background-color: ${colors.LIGHT_DARK};
            color: ${colors.GRAY};
          `;
        }
        case 'light': {
          return css`
            background-color: ${colors.WHITE};
            color: ${colors.LIGHT_DARK};
            box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
          `;
        }
      }
    }
  }}
`;

const MultiSelectSearchBar = (props) => {
  const { theme } = useContext(Context);
  return <Input className={`MultiSelectSearchBar`} theme={theme} {...props} />;
};

export default MultiSelectSearchBar;
