import axios from 'axios';
import { USER_NOTES_TYPES } from '../reducers/userNotes.reducers';
import { getNotesWithPagination } from '@api/notes.api';
import filterByName from 'utils/filters/byName';
import FormControl from 'utils/classes/FormControl';

const ROUTE_NOTE_V1 = '/api/v1/notes';

export const getNotes =
  (page = 1, limit = 12) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
      const response = await getNotesWithPagination({ page, limit });
      dispatch({ type: USER_NOTES_TYPES.USER_NOTES_GET, payload: response });
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
    dispatch({
      type: USER_NOTES_TYPES.USER_NOTES_ERROR,
      payload: '🚧: ' + 'No se pudo actualizar',
    });
  }
};

export const filterLocal = (input) => (dispatch, getState) => {
  const { userNotes } = getState().userNotesReducer;
  const notesFinded = input ? filterByName(input, userNotes) : userNotes;
  dispatch({
    type: USER_NOTES_TYPES.USER_NOTES_FILTER_LOCAL,
    payload: notesFinded,
  });
};
