import { ActionType, Notes } from '../../types';

export enum NoteTypes {
  GET_NOTES = 'GET_NOTES',
  ADD_NOTES = 'ADD_NOTES',
  REMOVE_NOTES = 'REMOVE_NOTES',
  LOADING = 'LOADING_NOTES',
  ERROR = 'ERROR_IN_NOTES',
}

export interface initialStateProps {
  notes: Notes;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: initialStateProps = {
  notes: [],
  loading: false,
  error: null,
};

const noteReducer = (state = INITIAL_STATE, action: ActionType) => {
  switch (action.type) {
    case NoteTypes.GET_NOTES:
      return { ...state, notes: action.payload, loading: false };
    case NoteTypes.ADD_NOTES:
      console.log(state);
      return { ...state, notes: [], loading: false };
    case NoteTypes.REMOVE_NOTES:
      const newNotes = state.notes.filter((note) => note._id !== action.payload);
      return { ...state, notes: newNotes, loading: false };
    case NoteTypes.LOADING:
      return { ...state, loading: true };
    case NoteTypes.ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default noteReducer;
