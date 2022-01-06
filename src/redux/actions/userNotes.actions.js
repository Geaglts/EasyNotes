import { USER_NOTES_TYPES } from '../reducers/userNotes.reducers';
import axios from 'axios';

export const getNotes = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
    const { data } = await axios.get('/api/v1/notes', {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_GET, payload: data.body });
  } catch (error) {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ERROR, payload: '🚧: ' + error });
  }
};

export const addNote = (noteData, token) => async (dispatch) => {
  try {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
    await axios.post('/api/v1/notes', noteData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ADD });
  } catch (error) {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ERROR, payload: '🚧: ' + error });
  }
};

export const removeNote = (noteId, token) => async (dispatch) => {
  try {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
    console.log({ noteId, token });
    const { data } = await axios.delete(`/api/v1/notes/${noteId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_REMOVE });
  } catch (error) {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ERROR, payload: '🚧: ' + error });
  }
};
