export const NoteTypes = {
  GET: 'GET_LIST_NOTE',
  ADD: 'ADD_NOTE',
  REMOVE: 'REMOVE_NOTE',
  LOADING: 'LOADING_NOTE',
  ERROR: 'ERROR_IN_NOTE',
};

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case NoteTypes.GET:
      return { ...state, notes: action.payload, loading: false, error: null };
    case NoteTypes.ADD:
      const updatedNotes = [...state.notes, action.payload];
      return { ...state, notes: updatedNotes, loading: false, error: null };
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
