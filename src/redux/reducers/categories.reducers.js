export const CategoryTypes = {
  GET: 'GET_LIST_CATEGORY',
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
    default: {
      return state;
    }
  }
}

export default categoryReducer;
