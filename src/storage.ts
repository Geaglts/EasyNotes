import { NOTES } from './constants';
import { Note } from './types';

export default {
  notes: {
    add(note: Note) {
      const notes = JSON.parse(localStorage.getItem(NOTES) || '[]');
      console.log({ notes, note });
    },
  },
};
