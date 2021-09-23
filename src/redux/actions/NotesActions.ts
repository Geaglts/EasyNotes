import { DispatchFunction, Note } from '../../types';
import { NoteTypes } from '../reducers/NotesReducer';
import { noteStorage } from '../../storage';

export const allNotes = () => async (dispatch: DispatchFunction) => {
  dispatch({ type: NoteTypes.LOADING });
  try {
    const notes = await noteStorage.get();
    dispatch({ type: NoteTypes.GET_NOTES, payload: notes });
  } catch (error) {
    dispatch({
      type: NoteTypes.ERROR,
      payload: '🚧: ' + error,
    });
  }
};

export const addNote = (note: Note) => async (dispatch: DispatchFunction) => {
  try {
    const newNote = await noteStorage.add(note);
    console.log(newNote);
    dispatch({ type: NoteTypes.ADD_NOTES, payload: newNote });
  } catch {
    dispatch({ type: NoteTypes.ERROR, payload: 'No se pudo crear la nota' });
  }
};

export const removeNote = (id: string) => async (dispatch: DispatchFunction) => {
  try {
    await noteStorage.remove(id);
    dispatch({ type: NoteTypes.REMOVE_NOTES, payload: id });
  } catch {
    dispatch({ type: NoteTypes.ERROR, payload: 'No se pudo eliminar la nota' });
  }
};
