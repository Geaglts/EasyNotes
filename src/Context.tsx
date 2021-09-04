import { createContext, useState } from 'react';
import { NotesContextState } from './types';
import { noteStorage } from './storage';

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const Context = createContext<NotesContextState>({
  notes: [],
  updateNotes: () => {},
});

const Provider = ({ children }: ProviderProps) => {
  const [notes, setNotes] = useState(noteStorage.get());

  const value = {
    notes,
    updateNotes() {
      setNotes(noteStorage.get());
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default { Provider };
