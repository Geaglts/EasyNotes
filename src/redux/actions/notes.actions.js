import { NoteTypes } from '../reducers/notes.reducers';
import { noteStorage } from '../../storage';

export const allNotes = () => async (dispatch) => {
  try {
    dispatch({ type: NoteTypes.LOADING });
    const notes = await noteStorage.get();
    dispatch({ type: NoteTypes.GET, payload: notes });
  } catch (error) {
    dispatch({ type: NoteTypes.ERROR, payload: '🚧: ' + error });
  }
};

export const addNote = (note) => async (dispatch) => {
  try {
    dispatch({ type: NoteTypes.LOADING });
    const noteWithId = await noteStorage.add(note);
    dispatch({ type: NoteTypes.ADD, payload: noteWithId });
  } catch {
    dispatch({ type: NoteTypes.ERROR, payload: 'No se pudo crear la nota' });
  }
};

export const removeNote = (id) => async (dispatch) => {
  try {
    dispatch({ type: NoteTypes.REMOVE, payload: id });
    await noteStorage.remove(id);
  } catch (error) {
    dispatch({ type: NoteTypes.ERROR, payload: 'No se pudo eliminar la nota' });
  }
};
