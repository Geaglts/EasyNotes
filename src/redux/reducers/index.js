import { combineReducers } from 'redux';
import noteReducer from './notes.reducers';
import userNotesReducer from './userNotes.reducers';

export default combineReducers({ noteReducer, userNotesReducer });
