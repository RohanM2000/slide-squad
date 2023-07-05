import jwtFetch from './jwt';

const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";
const RECEIVE_COMMENT = "comments/RECEIVE_PRESENTATOIN";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT"
const RECEIVE_COMMENT_ERRORS = "comments/RECEIVE_COMMENT_ERRORS";
const CLEAR_COMMENT_ERRORS = "comments/CLEAR_COMMENT_ERRORS";

const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});

export const removeComment = (commentId) => ({
    type: REMOVE_COMMENT, 
    commentId
})

const receiveErrors = errors => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors
});

export const clearCommentErrors = errors => ({
    type: CLEAR_COMMENT_ERRORS,
    errors
});

export const fetchComments = () => async dispatch => {
  try {
    const res = await jwtFetch ('/api/comments/');
    const comments = await res.json();
    dispatch(receiveComments(comments));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserComments = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/comments/user/${id}`);
    const comments = await res.json();
    dispatch(receiveComments(comments));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const createComment = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const comment = await res.json();
    dispatch(receiveComment(comment));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const updateComment = data => async dispatch => {
  try {
    const res = await jwtFetch(`/api/comments/${data.id}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const comment = await res.json();
    dispatch(receiveComment(comment));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};



export const deleteComment= (commentId) => async(dispatch) => {
    try {
        const res = await jwtFetch(`/api/comments/${commentId}`, {
          method: 'DELETE',
        });
        dispatch(receiveComment(commentId));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveErrors(resBody.errors));
        }
    }
}

const nullErrors = null;

export const commentErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    case RECEIVE_COMMENT:
    case CLEAR_COMMENT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const commentsReducer = (state = {}, action) => {
  let newState;
  switch(action.type) {
    case RECEIVE_COMMENTS:
      newState =  { ...state};
      action.comments.forEach(comment=>{
        newState[comment._id] = comment;
      });
      return newState;
    case RECEIVE_COMMENT:
      return { ...state, [action.comment._id]: action.comment};
    case REMOVE_COMMENT:
        delete newState[action.commentId]
        return newState
    default:
      return state;
  }
};

export default commentsReducer;