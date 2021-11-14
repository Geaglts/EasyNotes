import React from 'react';
import { createContext, useState } from 'react';
import { darkThemeStorage, userStorage } from './storage';

export const Context = createContext();

const Provider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(darkThemeStorage.get());
  const [hasUser, setHasUser] = useState(() => {
    return userStorage.get();
  });

  const changeTheme = () => {
    setDarkTheme(!darkTheme);
    darkThemeStorage.set(String(!darkTheme));
  };

  const changeUserStatus = () => {
    setHasUser(!hasUser);
  };

  const value = { darkTheme, changeTheme, hasUser, changeUserStatus };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default { Provider };
