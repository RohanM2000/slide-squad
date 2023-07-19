import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_PRESENTATIONS = "presentations/RECEIVE_PRESENTATIONS";
const RECEIVE_PRESENTATION = "presentations/RECEIVE_PRESENTATOIN";
const RECEIVE_PRESENTATION_ERRORS = "presentations/RECEIVE_PRESENTATION_ERRORS";
const CLEAR_PRESENTATION_ERRORS = "presentations/CLEAR_PRESENTATION_ERRORS";
export const REMOVE_PRESENTATION = "presentations/REMOVE_PRESENTATION";

const removePresentation = presentationId => ({
  type: REMOVE_PRESENTATION,
  presentationId
})
const receivePresentations = presentations => ({
  type: RECEIVE_PRESENTATIONS,
  presentations
});

const receivePresentation = presentation => ({
  type: RECEIVE_PRESENTATION,
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

export const deletePresentation = (presentationId) => async dispatch => {
  try{
    const res = await jwtFetch(`/api/presentations/${presentationId}`,{
      method: "DELETE"
    });
    dispatch(removePresentation(presentationId));
  } catch(err){
    const resBody = await err.json();
    if (resBody.statusCode===400){
      return dispatch(receiveErrors(resBody.errors));
    }
  }
}
export const fetchPresentations = () => async dispatch => {
  try {
    const res = await jwtFetch ('/api/presentations/');
    const presentations = await res.json();
    dispatch(receivePresentations(presentations));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchPresentation = (presentationId) => async dispatch => {
  try {
    const res = await jwtFetch (`/api/presentations/${presentationId}`);
    const presentation = await res.json();
    dispatch(receivePresentation(presentation));
  } 
  catch (err) {
    // console.log(err)
    // const resBody = await err.json();
    // if (resBody.statusCode === 400) {
    //   dispatch(receiveErrors(resBody.errors));
    // }
  }
};

export const fetchUserPresentations = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/presentations/user/${id}`);
    const presentations = await res.json();
    dispatch(receivePresentations(presentations));
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
    dispatch(receivePresentation(presentation));
    return res;
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const updatePresentation = (data, presentationId) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/presentations/${presentationId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
    const presentation = await res.json();
    dispatch(receivePresentation(presentation));
    return res;
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
    case RECEIVE_PRESENTATION:
    case CLEAR_PRESENTATION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const presentationsReducer = (state = {}, action) => {
  let newState;
  switch(action.type) {
    case RECEIVE_PRESENTATIONS:
      newState =  { ...state};
      action.presentations.forEach(presentation=>{
        newState[presentation._id] = presentation;
      });
      return newState;
    case RECEIVE_PRESENTATION:
      return { ...state, [action.presentation._id]: action.presentation};
    case RECEIVE_USER_LOGOUT:
      return { };
    case REMOVE_PRESENTATION:
      newState={...state};
      delete newState[action.presentationId];
      return newState;
    default:
      return state;
  }
};

export default presentationsReducer;