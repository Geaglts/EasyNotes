import { NOTES, TOTAL_IDS } from './constants';
import { Note, Notes } from './types';

const idManager = {
  get(): number {
    return Number(localStorage.getItem(TOTAL_IDS));
  },
  getNewId(): string {
    const totalIds = this.get();
    const newId = String(totalIds + 1);
    localStorage.setItem(TOTAL_IDS, newId);
    return newId;
  },
};

export const noteStorage = {
  get(): Notes {
    return JSON.parse(localStorage.getItem(NOTES) || '[]');
  },
  add(note: Note) {
    const notes = this.get();
    const _id = idManager.getNewId();
    notes.push({ _id, ...note });
    const stringNotes = JSON.stringify(notes);
    localStorage.setItem(NOTES, stringNotes);
  },
  remove(id: string) {
    const notes = this.get();
    const filteredNotes = notes.filter(({ _id }) => _id !== id);
    const stringNotes = JSON.stringify(filteredNotes);
    localStorage.setItem(NOTES, stringNotes);
  },
};
