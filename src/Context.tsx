import { createContext, useState } from 'react';
import { NotesContextState } from './types';
import { noteStorage } from './storage';

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const Context = createContext<NotesContextState>({
  notes: [],
  darkTheme: false,
  updateNotes: () => {},
  changeTheme: () => {},
});

const Provider = ({ children }: ProviderProps) => {
  const [notes, setNotes] = useState(noteStorage.get());
  const [darkTheme, setDarkTheme] = useState(false);

  const changeTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const value = {
    notes,
    darkTheme,
    changeTheme,
    updateNotes() {
      setNotes(noteStorage.get());
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default { Provider };
