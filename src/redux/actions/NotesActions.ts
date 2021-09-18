import { DispatchFunction } from '../../types';
import { NoteActions } from '../reducers/NotesReducer';
import { noteStorage } from '../../storage';

export const allNotes = () => async (dispatch: DispatchFunction) => {
  const notes = await noteStorage.get();
  dispatch({ type: NoteActions.GET_NOTES, payload: notes });
};
