import { combineReducers } from 'redux';
import noteReducer from './NotesReducer';

export default combineReducers({ notes: noteReducer });
