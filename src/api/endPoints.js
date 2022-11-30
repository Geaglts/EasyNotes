const baseUrl = process.env.API_URL || 'http://localhost:3000';

const endPoints = {
  notes: {
    notesWithQueries: (queries = '?') => `${baseUrl}/api/v2/notes${queries}`,
    addCategories: `${baseUrl}/api/v1/categories/note`,
  },
  categories: {
    updateCategory: (id) => `/api/v1/categories/${id}`,
  },
};

export default endPoints;
