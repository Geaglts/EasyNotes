import { USER_NOTES_TYPES } from '../reducers/userNotes.reducers';
import axios from 'axios';

export const getNotes = () => async (dispatch) => {
  try {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
    const { data } = await axios.get('/api/v1/notes');
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_GET, payload: data.body });
  } catch (error) {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ERROR, payload: '🚧: ' + error });
  }
};

export const addNote = (noteData) => async (dispatch) => {
  try {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
    await axios.post('/api/v1/notes', noteData);
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ADD });
    dispatch(getNotes());
  } catch (error) {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ERROR, payload: '🚧: ' + error });
  }
};

export const removeNote = (noteId) => async (dispatch) => {
  try {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
    await axios.delete(`/api/v1/notes/${noteId}`);
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_REMOVE });
    dispatch(getNotes());
  } catch (error) {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ERROR, payload: '🚧: ' + error });
  }
};
