import axios from 'axios';
import endPoints from './endPoints';

export const updateCategory = async (id, data) => {
  try {
    const url = endPoints.categories.updateCategory(id);
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
    return false;
  }
};
