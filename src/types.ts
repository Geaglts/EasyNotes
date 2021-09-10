import { FormEvent } from 'react';

export type HandleChange =
  | FormEvent<HTMLInputElement>
  | FormEvent<HTMLTextAreaElement>;

export type Note = {
  _id?: string;
  title: string;
  content: string;
};

export type Notes = Array<Note>;

export type NotesContextState = {
  notes: Notes;
  updateNotes: () => void;
  darkTheme: boolean;
  changeTheme: () => void;
};
