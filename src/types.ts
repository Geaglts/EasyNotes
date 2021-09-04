import { FormEvent } from 'react';

export type HandleChange =
  | FormEvent<HTMLInputElement>
  | FormEvent<HTMLTextAreaElement>;

export type Note = {
  title: string;
  content: string;
};
