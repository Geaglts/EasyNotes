import styled, { css } from 'styled-components';

export const Container = styled.div`
  min-height: calc(100vh - 60px);

  ${({ padding, margin }) => {
    return css`
      ${padding && `padding: ${padding};`}
      ${margin && `margin: ${margin};`}
    `;
  }}

  ${(props) =>
    props.center &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    `}
    
  background-color: ${(props) => (props.theme === 'dark' ? '#141414' : '#f8f8f8')};
`;
