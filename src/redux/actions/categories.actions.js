import axios from 'axios';
import { CategoryTypes } from 'reducers/categories.reducers';
import FormControl from 'utils/classes/FormControl';

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CategoryTypes.LOADING });
    const { data } = await axios.get('/api/v1/categories');
    if (data.body) {
      const categories = data.body.map((category) => {
        const { description, name } = category;
        const decryptData = FormControl.decryptData({ description, name });
        return { ...category, ...decryptData };
      });
      dispatch({ type: CategoryTypes.GET, payload: categories });
    } else {
      dispatch({ type: CategoryTypes.ERROR, payload: '🚧: ' + '🕯' });
    }
  } catch (error) {
    dispatch({ type: CategoryTypes.ERROR, payload: '🚧: ' + error });
  }
};

export const addNote = (note) => async (dispatch) => {
  try {
    dispatch({ type: NoteTypes.LOADING });
    const noteWithId = await noteStorage.add(note);
    dispatch({ type: NoteTypes.ADD, payload: noteWithId });
  } catch {
    dispatch({ type: NoteTypes.ERROR, payload: 'No se pudo crear la nota' });
  }
};

export const removeNote = (id) => async (dispatch) => {
  try {
    dispatch({ type: NoteTypes.REMOVE, payload: id });
    await noteStorage.remove(id);
  } catch (error) {
    dispatch({ type: NoteTypes.ERROR, payload: 'No se pudo eliminar la nota' });
  }
};
