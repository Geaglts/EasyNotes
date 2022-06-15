import axios from 'axios';

export const getNotesWithPagination = async ({ page = 1, limit = 16 }) => {
  try {
    const { data } = await axios.get(`/api/v2/notes?page=${page}&limit=${limit}`);
    return data;
  } catch (error) {
    //console.log(error);
    return false;
  }
};

export const getNotesWithCustomAttributess = async (attributes = []) => {
  try {
    const { data } = await axios.get(
      `/api/v2/notes?attributes=${JSON.stringify(attributes)}`
    );
    return data;
  } catch (error) {
    //console.log(error);
    return false;
  }
};

export const getManyNotesById = async (ids = []) => {
  try {
    const { data } = await axios.get(
      `/api/v2/notes/many?ids=${JSON.stringify(ids)}`
    );
    return data;
  } catch (error) {
    //console.log(error);
    return false;
  }
};
