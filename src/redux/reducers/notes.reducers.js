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

function noteReducer(state = initialState, action) {
  switch (action.type) {
    case NoteTypes.GET: {
      return { notes: action.payload, loading: false, error: null };
    }
    case NoteTypes.ADD: {
      const updatedNotes = [...state.notes, action.payload];
      return { notes: updatedNotes, loading: false, error: null };
    }
    case NoteTypes.REMOVE: {
      const id = action.payload;
      const updatedNotes = state.notes.filter((note) => note._id !== id);
      return { notes: updatedNotes, loading: false, error: null };
    }
    case NoteTypes.LOADING: {
      return { ...state, loading: true, error: null };
    }
    case NoteTypes.ERROR: {
      return { ...state, error: action.payload, loading: false };
    }
    default: {
      return state;
    }
  }
}

export default noteReducer;
