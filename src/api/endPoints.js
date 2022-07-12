const baseUrl = process.env.API_URL || 'http://localhost:3000';

const endPoints = {
  notes: {
    notesWithQueries: (queries = '?') => `${baseUrl}/api/v2/notes${queries}`,
  },
};

export default endPoints;
