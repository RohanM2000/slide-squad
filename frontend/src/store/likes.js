import jwtFetch from './jwt';
import { REMOVE_PRESENTATION } from './presentations';
const RECEIVE_LIKES = "likes/RECEIVE_LIKES";
const RECEIVE_LIKE = "likes/RECEIVE_PRESENTATOIN";
const REMOVE_LIKE = "likes/REMOVE_LIKE"
const RECEIVE_LIKE_ERRORS = "likes/RECEIVE_LIKE_ERRORS";
const CLEAR_LIKE_ERRORS = "likes/CLEAR_LIKE_ERRORS";

const receiveLikes = likes => ({
  type: RECEIVE_LIKES,
  likes
});

const receiveLike = like => ({
  type: RECEIVE_LIKE,
  like
});

export const removeLike = (likeId) => ({
    type: REMOVE_LIKE, 
    likeId
})

const receiveErrors = errors => ({
  type: RECEIVE_LIKE_ERRORS,
  errors
});

export const clearLikeErrors = errors => ({
    type: CLEAR_LIKE_ERRORS,
    errors
});

export const fetchLikes = () => async dispatch => {
  try {
    const res = await jwtFetch('/api/likes/');
    const likes = await res.json();
    dispatch(receiveLikes(likes));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserLikes = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/likes/user/${id}`);
    const likes = await res.json();
    dispatch(receiveLikes(likes));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const createLike = data => async dispatch => {
  try {
    const res = await jwtFetch(`/api/likes/presentation/${data.likeId}/like`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const like = await res.json();
    dispatch(receiveLike(like));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deleteLike= (likeId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/likes/like/${likeId}`, {
          method: 'DELETE',
        });
        const like = await res.json();
        // console.log("RESULT", like)
        dispatch(removeLike(like));
    } catch(err) {
        // console.log("DELETED THE THING", err);
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const deleteLikeByPresentation= (presentationId) => async (dispatch) => {
  try {
      const res = await jwtFetch(`/api/likes/presentation/${presentationId}`, {
        method: 'DELETE',
      });
      const like = await res.json();
      // console.log("RESULT", like)
      dispatch(removeLike(like));
  } catch(err) {
      // console.log("DELETED THE THING", err);
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
  }
}


const nullErrors = null;

export const likeErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_LIKE_ERRORS:
      return action.errors;
    case RECEIVE_LIKE:
    case CLEAR_LIKE_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const likesReducer = (state = {}, action) => {
  let newState;
  switch(action.type) {
    case RECEIVE_LIKES:
      newState =  { ...state};
      // console.log("action likes", action.likes);
      action.likes.forEach(like=>{
        newState[like._id] = like;
      });
      // console.log("new state", newState);
      return newState;
    case RECEIVE_LIKE:
      return { ...state, [action.like._id]: action.like};
    case REMOVE_LIKE:
        newState = state;
        delete newState[action.likeId];
        return newState;
    case REMOVE_PRESENTATION:
      // console.log("hitting here");
      newState = {}
      const likes = Object.values(state);
        // console.log("action", action);
        // console.log("newState", newState);
      likes.forEach((like)=>{
        // console.log("like", like)
        if (like.likeId && like.likeId._id !== action.presentationId) {
          // delete newState[like._id];
          // console.log("collision")
          newState[like._id] = like;
        }
      })
      return newState;
    default:
      return state;
  }
};

export default likesReducer;