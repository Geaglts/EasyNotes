import { DispatchFunction, Note, Notes } from '../../types';
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

export const addNote = (note: Note) => async (dispatch: DispatchFunction, getState: any) => {
  try {
    const { notes } = getState().noteReducer;
    const updatedNotes = [ ...notes, note ]; 
    const newNote = await noteStorage.add(note);
    dispatch({ type: NoteTypes.ADD_NOTES, payload: updatedNotes });
  } catch {
    dispatch({ type: NoteTypes.ERROR, payload: 'No se pudo crear la nota' });
  }
};

export const removeNote = (id: string) => async (dispatch: DispatchFunction, getState: any) => {
  try {  
    const { notes }: { notes: Notes } = getState().noteReducer;
    const updatedNotes = notes.filter(note => note._id !== id);
    await noteStorage.remove(id);
    dispatch({ type: NoteTypes.REMOVE_NOTES, payload: updatedNotes });
  } catch (error) {
    dispatch({ type: NoteTypes.ERROR, payload: 'No se pudo eliminar la nota' });
  }
};
