import React from 'react';
import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 4px;
  background-color: #333842;
  color: #70737a;
  border: 0;
  padding: 0 8px;
  font-size: 12pt;
`;

const MultiSelectSearchBar = (props) => {
  return <Input className="MultiSelectSearchBar" {...props} />;
};

export default MultiSelectSearchBar;
