import axios from 'axios';
import { USER_NOTES_TYPES } from '../reducers/userNotes.reducers';
import {
  getNotesWithPagination,
  getNotesWithCustomAttributess,
  getManyNotesById,
  getNotesByCategories,
  addCategoriesToNote,
} from '@api/notes.api';
import filterByName from '@utils/filters/byName';

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

export const addNote = (noteData, category) => async (dispatch, getStore) => {
  try {
    const { page } = getStore().userNotesReducer.pagination;
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
    const { data } = await axios.post(ROUTE_NOTE_V1, noteData);
    if (category.length > 0) {
      await axios.post('/api/v1/categories/note', { note: data.body.id, category });
    }
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ADD });
    dispatch(getNotes(page));
  } catch (error) {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ERROR, payload: '🚧: ' + error });
  }
};

export const removeNote = (noteId) => async (dispatch, store) => {
  try {
    const { page } = store().userNotesReducer.pagination;
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
    await axios.delete(`${ROUTE_NOTE_V1}/${noteId}`);
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_REMOVE });
    dispatch(getNotes(page));
  } catch (error) {
    dispatch({ type: USER_NOTES_TYPES.USER_NOTES_ERROR, payload: '🚧: ' + error });
  }
};

export const updateNote =
  (updatedNoteValues, id, categories) => async (dispatch, getStore) => {
    try {
      const { page } = getStore().userNotesReducer.pagination;
      dispatch({ type: USER_NOTES_TYPES.USER_NOTES_LOADING });
      await axios.patch(`${ROUTE_NOTE_V1}/${id}`, updatedNoteValues);
      await addCategoriesToNote(id, categories);
      dispatch(getNotes(page));
    } catch (error) {
      dispatch({
        type: USER_NOTES_TYPES.USER_NOTES_ERROR,
        payload: '🚧: ' + 'No se pudo actualizar',
      });
    }
  };

export const filterLocal = (input) => async (dispatch, getState) => {
  if (!input) {
    dispatch({
      type: USER_NOTES_TYPES.USER_NOTES_FILTER_LOCAL,
      payload: null,
    });
  } else {
    let findIn = null;
    const { userNotes, globalNotes } = getState().userNotesReducer;
    const globalNotesHaveItems = globalNotes.length > 0;
    findIn = globalNotesHaveItems ? globalNotes : userNotes;
    const notesFinded = input ? filterByName(input, findIn) : userNotes;
    if (globalNotesHaveItems) {
      const ids = notesFinded.map(({ id }) => id);
      const notesWithSameId = await getManyNotesById(ids);
      dispatch({
        type: USER_NOTES_TYPES.USER_NOTES_FILTER_LOCAL,
        payload: notesWithSameId,
      });
    } else {
      dispatch({
        type: USER_NOTES_TYPES.USER_NOTES_FILTER_LOCAL,
        payload: notesFinded,
      });
    }
  }
};

export const fillGlobalNotes =
  (clear = false) =>
  async (dispatch) => {
    const notes = await getNotesWithCustomAttributess(['title']);
    dispatch({
      type: USER_NOTES_TYPES.USER_NOTES_FILL_GLOBAL_NOTES,
      payload: clear ? [] : notes,
    });
  };

export const filterByCategory =
  (categories = []) =>
  async (dispatch) => {
    try {
      const notes = await getNotesByCategories(`[${categories.join(',')}]`);
      if (categories.length === 0) {
        dispatch({
          type: USER_NOTES_TYPES.USER_NOTES_FILTER_LOCAL,
          payload: null,
        });
        return;
      }
      dispatch({
        type: USER_NOTES_TYPES.USER_NOTES_FILTER_LOCAL,
        payload: notes,
      });
    } catch (error) {}
  };
