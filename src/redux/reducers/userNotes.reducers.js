export const USER_NOTES_TYPES = {
  USER_NOTES_GET: 'USER_NOTES_GET',
  USER_NOTES_ADD: 'USER_NOTES_ADD',
  USER_NOTES_REMOVE: 'USER_NOTES_REMOVE',
  USER_NOTES_LOADING: 'USER_NOTES_LOADING',
  USER_NOTES_ERROR: 'USER_NOTES_ERROR',
};

const initialState = {
  userNotes: [],
  numberOfNotes: 0,
  error: null,
  loading: false,
};

function userNotesReducer(state = initialState, action) {
  switch (action.type) {
    case USER_NOTES_TYPES.USER_NOTES_GET: {
      return { ...state, loading: false, userNotes: action.payload, numberOfNotes: action.payload.length };
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
    default: {
      return state;
    }
  }
}

export default userNotesReducer;
