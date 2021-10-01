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

export const addNote = (note) => async (dispatch, getState) => {
  try {
    const { notes } = getState().noteReducer;
    const updatedNotes = [...notes, note];
    await noteStorage.add(note);
    dispatch({ type: NoteTypes.ADD, payload: updatedNotes });
  } catch {
    dispatch({ type: NoteTypes.ERROR, payload: 'No se pudo crear la nota' });
  }
};

export const removeNote = (id) => async (dispatch, getState) => {
  try {
    const { notes } = getState().noteReducer;
    const updatedNotes = notes.filter((note) => note._id !== id);
    await noteStorage.remove(id);
    dispatch({ type: NoteTypes.REMOVE, payload: updatedNotes });
  } catch (error) {
    dispatch({ type: NoteTypes.ERROR, payload: 'No se pudo eliminar la nota' });
  }
};
