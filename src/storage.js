import { DARK_MODE, NOTES, TOTAL_IDS, USER_LOGGED, USER_TOKEN } from '@constants';

const idManager = {
  get() {
    return Number(localStorage.getItem(TOTAL_IDS));
  },
  getNewId() {
    const totalIds = this.get();
    const newId = String(totalIds + 1);
    localStorage.setItem(TOTAL_IDS, newId);
    return newId;
  },
};

export const noteStorage = {
  get() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const notes = JSON.parse(localStorage.getItem(NOTES) || '[]');
        if (!notes) reject('No se pudieron cargar las notas');
        resolve(notes);
      }, 500);
    });
  },
  async add(note) {
    const notes = await this.get();
    const _id = idManager.getNewId();
    const newNote = { _id, ...note };
    notes.push(newNote);
    const stringNotes = JSON.stringify(notes);
    localStorage.setItem(NOTES, stringNotes);
    return newNote;
  },
  async remove(id) {
    const notes = await this.get();
    const filteredNotes = notes.filter(({ _id }) => _id !== id);
    const stringNotes = JSON.stringify(filteredNotes);
    localStorage.setItem(NOTES, stringNotes);
  },
  copy(value) {
    navigator.clipboard.writeText(value);
  },
};

export const darkThemeStorage = {
  get() {
    const isDarkModeActive = localStorage.getItem(DARK_MODE);
    return isDarkModeActive === 'true';
  },
  set(status) {
    localStorage.setItem(DARK_MODE, status);
  },
  isOnStorage() {
    const exists = localStorage.getItem(DARK_MODE);
    return exists !== null;
  },
};

export const userStorage = {
  set(value, token) {
    window.localStorage.setItem(USER_LOGGED, value);
    window.localStorage.setItem(USER_TOKEN, token);
  },
  get() {
    const hasUser = window.localStorage.getItem(USER_LOGGED);
    return hasUser === 'true';
  },
  getToken() {
    try {
      const token = window.localStorage.getItem(USER_TOKEN);
      if (token !== 'undefined') {
        return token;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
  removeSession() {
    try {
      window.localStorage.removeItem(USER_TOKEN);
      window.localStorage.removeItem(USER_LOGGED);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export const browserStorage = {
  get(key) {
    return window.localStorage.getItem(key);
  },
  set(key, value) {
    window.localStorage.setItem(key, value);
  },
  delete(key) {
    window.localStorage.removeItem(key);
  },
};
