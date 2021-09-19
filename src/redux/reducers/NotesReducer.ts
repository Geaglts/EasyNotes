import { ActionType, Notes } from '../../types';

export enum NoteTypes {
  GET_NOTES = 'GET_NOTES',
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
      return <typeof state>{ ...state, notes: action.payload, loading: false };
    case NoteTypes.LOADING:
      return <typeof state>{ ...state, loading: true };
    case NoteTypes.ERROR:
      return <typeof state>{ ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default noteReducer;
