export const CategoryTypes = {
  GET: 'GET_LIST_CATEGORY',
  ADD: 'ADD_CATEGORY',
  REMOVE: 'REMOVE_CATEGORY',
  LOADING: 'LOADING_CATEGORY',
  ERROR: 'ERROR_IN_CATEGORY',
};

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CategoryTypes.GET: {
      return { categories: action.payload, loading: false, error: null };
    }
    case CategoryTypes.ADD: {
      const updatedNotes = [...state.notes, action.payload];
      return { notes: updatedNotes, loading: false, error: null };
    }
    case CategoryTypes.REMOVE: {
      const id = action.payload;
      const updatedNotes = state.notes.filter((note) => note._id !== id);
      return { notes: updatedNotes, loading: false, error: null };
    }
    case CategoryTypes.LOADING: {
      return { ...state, loading: true, error: null };
    }
    case CategoryTypes.ERROR: {
      return { ...state, error: action.payload, loading: false };
    }
    default: {
      return state;
    }
  }
}

export default categoryReducer;
