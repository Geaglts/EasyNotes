import { DispatchFunction } from '../../types';
import { NoteTypes } from '../reducers/NotesReducer';
import { noteStorage } from '../../storage';

export const allNotes = () => async (dispatch: DispatchFunction) => {
  try {
    const notes = await noteStorage.get();
    dispatch({ type: NoteTypes.GET_NOTES, payload: notes });
  } catch (error) {
    console.log('A ocurrido un error');
  }
};
