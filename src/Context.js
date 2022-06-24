import React from 'react';
import { createContext } from 'react';
import useInitialState from '@hooks/useInitialState';

export const Context = createContext();

const Provider = ({ children }) => {
  const initialState = useInitialState();
  return <Context.Provider value={initialState}>{children}</Context.Provider>;
};

export default { Provider };
