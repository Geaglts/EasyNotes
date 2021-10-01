import { ActionType, Notes } from '../../types';

export enum NoteTypes {
  GET = 'GET_NOTES',
  ADD = 'ADD_NOTES',
  REMOVE = 'REMOVE_NOTES',
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
