export const NoteTypes = {
  GET: 'GET_NOTES',
  ADD: 'ADD_NOTES',
  REMOVE: 'REMOVE_NOTES',
  LOADING: 'LOADING_NOTES',
  ERROR: 'ERROR_IN_NOTES',
};

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const noteReducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case NoteTypes.GET:
      return { ...state, notes: action.payload, loading: false, error: null };
    case NoteTypes.ADD:
      return { ...state, notes: action.payload, loading: false, error: null };
    case NoteTypes.REMOVE:
      return { ...state, notes: action.payload, loading: false, error: null };
    case NoteTypes.LOADING:
      return { ...state, loading: true, error: null };
    case NoteTypes.ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default noteReducer;
