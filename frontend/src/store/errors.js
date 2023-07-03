import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { presentationErrorsReducer } from './presentations';

export default combineReducers({
  session: sessionErrorsReducer,
  presentations: presentationErrorsReducer
});