export const USER_NOTES_TYPES = {
  USER_NOTES_GET: 'USER_NOTES_GET',
  USER_NOTES_ADD: 'USER_NOTES_ADD',
  USER_NOTES_REMOVE: 'USER_NOTES_REMOVE',
  USER_NOTES_LOADING: 'USER_NOTES_LOADING',
  USER_NOTES_ERROR: 'USER_NOTES_ERROR',
  USER_NOTES_FILTER_LOCAL: 'USER_NOTES_FILTER_LOCAL',
  USER_NOTES_FILL_GLOBAL_NOTES: 'USER_NOTES_FILL_GLOBAL_NOTES',
};

const initialState = {
  userNotes: [],
  pagination: {},
  numberOfNotes: 0,
  error: null,
  loading: false,
  filtered: null,
  globalNotes: [],
};

function userNotesReducer(state = initialState, action) {
  switch (action.type) {
    case USER_NOTES_TYPES.USER_NOTES_GET: {
      return {
        ...state,
        loading: false,
        userNotes: action.payload.noteList,
        numberOfNotes: action.payload.length,
        pagination: action.payload.pagination,
        filtered: null,
      };
    }
    case USER_NOTES_TYPES.USER_NOTES_ADD: {
      return { ...state, loading: false, error: null };
    }
    case USER_NOTES_TYPES.USER_NOTES_REMOVE: {
      return { ...state, loading: false, error: null };
    }
    case USER_NOTES_TYPES.USER_NOTES_LOADING: {
      return { ...state, loading: true, error: null };
    }
    case USER_NOTES_TYPES.USER_NOTES_ERROR: {
      return { ...state, error: action.payload, loading: false };
    }
    case USER_NOTES_TYPES.USER_NOTES_FILTER_LOCAL: {
      return { ...state, filtered: action.payload, loading: false };
    }
    case USER_NOTES_TYPES.USER_NOTES_FILL_GLOBAL_NOTES: {
      return { ...state, globalNotes: action.payload };
    }
    default: {
      return state;
    }
  }
}

export default userNotesReducer;
