import axios from 'axios';
import { CategoryTypes } from '@reducers/categories.reducers';
import { uiLoading } from './ui.actions';
import FormControl from '@utils/classes/FormControl';

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

export const addCategory = (category) => async (dispatch) => {
  try {
    dispatch(uiLoading());
    await axios.post('/api/v1/categories', category);
    dispatch(getCategories());
  } catch (error) {
    // console.log('🎃: ', error);
    dispatch(error.message);
  } finally {
    dispatch(uiLoading());
  }
};

export const removeCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch(uiLoading());
    await axios.delete(`/api/v1/categories/${categoryId}`);
    dispatch(getCategories());
  } catch (error) {
    // console.log(error);
  } finally {
    dispatch(uiLoading());
  }
};
