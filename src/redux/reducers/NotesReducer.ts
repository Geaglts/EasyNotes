import { ActionType, Notes } from '../../types';

export enum NoteActions {
  GET_NOTES = 'GET_NOTES',
}

export interface initialStateProps {
  notes: Notes;
}

const INITIAL_STATE: initialStateProps = {
  notes: [],
};

const noteReducer = (state = INITIAL_STATE, action: ActionType) => {
  switch (action.type) {
    case NoteActions.GET_NOTES:
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

export default noteReducer;
