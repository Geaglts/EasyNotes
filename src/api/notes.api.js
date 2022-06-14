import axios from 'axios';

export const getNotesWithPagination = async ({ page = 1, limit = 16 }) => {
  try {
    const { data } = await axios.get(`/api/v2/notes?page=${page}&limit=${limit}`);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
