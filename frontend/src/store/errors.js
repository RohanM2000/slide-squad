import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { tweetErrorsReducer } from './presentations';

export default combineReducers({
  session: sessionErrorsReducer,
  tweets: tweetErrorsReducer
});