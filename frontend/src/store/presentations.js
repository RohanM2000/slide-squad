import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_PRESENTATIONS = "presentations/RECEIVE_PRESENTATIONS";
const RECEIVE_USER_PRESENTATIONS = "presentations/RECEIVE_USER_PRESENTATIONS";
const RECEIVE_NEW_PRESENTATION = "presentations/RECEIVE_NEW_PRESENTATION";
const RECEIVE_PRESENTATION_ERRORS = "presentations/RECEIVE_PRESENTATION_ERRORS";
const CLEAR_PRESENTATION_ERRORS = "presentations/CLEAR_PRESENTATION_ERRORS";

const receivePresentations = presentations => ({
  type: RECEIVE_PRESENTATIONS,
  presentations
});

const receiveUserPresentations = presentations => ({
  type: RECEIVE_USER_PRESENTATIONS,
  presentations
});

const receiveNewPresentation = presentation => ({
  type: RECEIVE_NEW_PRESENTATION,
  presentation
});

const receiveErrors = errors => ({
  type: RECEIVE_PRESENTATION_ERRORS,
  errors
});

export const clearPresentationErrors = errors => ({
    type: CLEAR_PRESENTATION_ERRORS,
    errors
});

export const fetchPresentations = () => async dispatch => {
  try {
    const res = await jwtFetch ('/api/presentations');
    const presentations = await res.json();
    dispatch(receivePresentations(presentations));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserPresentations = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/presentations/user/${id}`);
    const presentations = await res.json();
    dispatch(receiveUserPresentations(presentations));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const composePresentation = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/presentations/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const presentation = await res.json();
    dispatch(receiveNewPresentation(presentation));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const nullErrors = null;

export const presentationErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_PRESENTATION_ERRORS:
      return action.errors;
    case RECEIVE_NEW_PRESENTATION:
    case CLEAR_PRESENTATION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const presentationsReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_PRESENTATIONS:
      return { ...state, ...action.presentations};
    case RECEIVE_USER_PRESENTATIONS:
      return { ...action.presentations};
    case RECEIVE_NEW_PRESENTATION:
      return { ...state, [action.presentation.id]: action.presentation};
    case RECEIVE_USER_LOGOUT:
      return { }
    default:
      return state;
  }
};

export default presentationsReducer;