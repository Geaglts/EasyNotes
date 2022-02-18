import { combineReducers } from 'redux';
import noteReducer from './notes.reducers';
import userNotesReducer from './userNotes.reducers';
import categoryReducer from './categories.reducers';

export default combineReducers({ noteReducer, userNotesReducer, categories: categoryReducer });
