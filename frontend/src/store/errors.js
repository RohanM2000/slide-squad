import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { presenationErrorsReducer } from './presentationss';

export default combineReducers({
  session: sessionErrorsReducer,
  presentations: presentationErrorsReducer
});