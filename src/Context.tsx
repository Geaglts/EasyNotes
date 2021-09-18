import { createContext, useState } from 'react';
import { NotesContextState } from './types';
import { darkThemeStorage } from './storage';

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const Context = createContext<NotesContextState>({
  darkTheme: false,
  updateNotes: () => {},
  changeTheme: () => {},
});

const Provider = ({ children }: ProviderProps) => {
  const [darkTheme, setDarkTheme] = useState(darkThemeStorage.get());

  const changeTheme = () => {
    setDarkTheme(!darkTheme);
    darkThemeStorage.set(String(!darkTheme));
  };

  const value = {
    darkTheme,
    changeTheme,
    updateNotes() {
      console.log('Hola');
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default { Provider };
