import React from 'react';
import { createContext, useState } from 'react';
import { darkThemeStorage } from './storage';

export const Context = createContext();

const Provider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(darkThemeStorage.get());

  const changeTheme = () => {
    setDarkTheme(!darkTheme);
    darkThemeStorage.set(String(!darkTheme));
  };

  const value = { darkTheme, changeTheme };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default { Provider };
