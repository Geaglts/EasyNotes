import { combineReducers } from 'redux';
import noteReducer from './notes.reducers';
import userNotesReducer from './userNotes.reducers';
import categoryReducer from './categories.reducers';
import uiReducer from './ui.reducer';

export default combineReducers({
  noteReducer,
  userNotesReducer,
  categories: categoryReducer,
  ui: uiReducer,
});
