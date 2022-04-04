import { USER_NOTES_TYPES } from '../reducers/userNotes.reducers';
import { uiLoading } from './ui.actions';
import axios from 'axios';

const ROUTE_NOTE_V1 = '/api/v1/notes';

export const getNotes = () => async (dispatch) => {
  try {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
    const { data } = await axios.get(ROUTE_NOTE_V1);
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_GET, payload: data.body });
  } catch (error) {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ERROR, payload: '🚧: ' + error });
  }
};

export const addNote = (noteData, category) => async (dispatch) => {
  try {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
    const { data } = await axios.post(ROUTE_NOTE_V1, noteData);
    if (category.length > 0) {
      await axios.post('/api/v1/categories/note', { note: data.body.id, category });
    }
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ADD });
    dispatch(getNotes());
  } catch (error) {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ERROR, payload: '🚧: ' + error });
  }
};

export const removeNote = (noteId) => async (dispatch) => {
  try {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
    await axios.delete(`${ROUTE_NOTE_V1}/${noteId}`);
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_REMOVE });
    dispatch(getNotes());
  } catch (error) {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ERROR, payload: '🚧: ' + error });
  }
};

export const updateNote = (updatedNoteValues, id) => async (dispatch) => {
  try {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
    await axios.patch(`${ROUTE_NOTE_V1}/${id}`, updatedNoteValues);
    dispatch(getNotes());
  } catch (error) {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ERROR, payload: '🚧: ' + 'No se pudo actualizar' });
  }
};
