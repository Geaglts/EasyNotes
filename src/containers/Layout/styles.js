import styled, { css } from 'styled-components';

export const Container = styled.div`
  background-color: ${(props) => (props.theme === 'dark' ? '#141414' : '#f8f8f8')};
`;

export const Content = styled.div`
  min-height: calc(100vh - 60px);
  max-width: 950px;
  margin: 0 auto;

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
`;
