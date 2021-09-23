import { DARK_MODE, NOTES, TOTAL_IDS } from './constants';
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
  get(): Promise<Notes> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const notes = JSON.parse(localStorage.getItem(NOTES) || '[]');
        if (!notes) reject('No se pudieron cargar las notas');
        resolve(notes);
      }, 500);
    });
  },
  async add(note: Note) {
    const notes = await this.get();
    const _id = idManager.getNewId();
    const newNote = { _id, ...note };
    notes.push(newNote);
    const stringNotes = JSON.stringify(notes);
    localStorage.setItem(NOTES, stringNotes);
    return newNote;
  },
  async remove(id: string) {
    const notes = await this.get();
    const filteredNotes = notes.filter(({ _id }) => _id !== id);
    const stringNotes = JSON.stringify(filteredNotes);
    localStorage.setItem(NOTES, stringNotes);
  },
  copy({ title, content }: Note) {
    const noteCopyTemplate = `${title}\n\n${content}`;
    navigator.clipboard.writeText(noteCopyTemplate);
  },
};

export const darkThemeStorage = {
  get() {
    const isDarkModeActive = localStorage.getItem(DARK_MODE);
    return isDarkModeActive === 'true';
  },
  set(status: string) {
    localStorage.setItem(DARK_MODE, status);
  },
};
