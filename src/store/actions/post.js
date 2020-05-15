import * as ACTION_TYPES from './action_types';
import axios from '../../axios';

export const fetchPostsStart = () => {
  return {
      type: ACTION_TYPES.FETCH_POSTS_START,
  };
};
  
export const fetchPostsSuccess = posts => {
  return {
    type: ACTION_TYPES.FETCH_POSTS_SUCCESS,
    posts: posts,
  }
};
  
export const fetchPostsFailed = (error) => {
  return {
      type: ACTION_TYPES.FETCH_POSTS_FAIL,
      error: error,
  };
};
  
export const fetchPosts = (query) => {
  return dispatch => {
      dispatch(fetchPostsStart());
      axios.get('/posts', { params: { query }})
          .then(response => {
              dispatch(fetchPostsSuccess(response.data));
          })
          .catch(error => {
              dispatch(fetchPostsFailed(error));
          });
  };
};

export const addPostSuccess = () => {
  return {
    type: ACTION_TYPES.ADD_POST_SUCCESS,
  };
};
  
export const addPostFailed = () => {
  return {
      type: ACTION_TYPES.ADD_POST_FAIL,
  };
};

export const addPost = (data) => {
  return dispatch => {
      axios.post('/posts', data)
          .then(() => dispatch(addPostSuccess()))
          .catch(() => dispatch(addPostFailed()));
  };
};

export const editPostSuccess = () => {
  return {
    type: ACTION_TYPES.EDIT_POST_SUCCESS,
  };
};
  
export const editPostFailed = () => {
  return {
      type: ACTION_TYPES.EDIT_POST_FAIL,
  };
};

export const editPost = (data) => {
  return dispatch => {
      axios.put('/posts', data)
          .then(() => dispatch(editPostSuccess()))
          .catch(() => dispatch(editPostFailed()));
  };
};

export const fetchPostCommentsStart = () => {
  return {
      type: ACTION_TYPES.FETCH_POST_COMMENTS_START,
  };
};
  
export const fetchPostCommentsSuccess = comments => {
  return {
    type: ACTION_TYPES.FETCH_POST_COMMENTS_SUCCESS,
    comments: comments,
  };
};
  
export const fetchPostCommentsFailed = (error) => {
  return {
      type: ACTION_TYPES.FETCH_POST_COMMENTS_FAIL,
      error: error,
  };
};

export const fetchPostComments = (params) => {
  return dispatch => {
      dispatch(fetchPostCommentsStart());
      axios.get('/posts/comments', { params: params })
          .then(response => {
              dispatch(fetchPostCommentsSuccess(response.data));
          })
          .catch(error => {
              dispatch(fetchPostCommentsFailed(error));
          });
  };
};

export const addPostCommentSuccess = comment => {
  return {
    type: ACTION_TYPES.ADD_POST_COMMENT_SUCCESS,
    comment: comment,
  };
};
  
export const addPostCommentFailed = () => {
  return {
      type: ACTION_TYPES.ADD_POST_COMMENT_FAIL,
  };
};

export const addPostComment = (data) => {
  return dispatch => {
      axios.post('/posts/comments', data)
          .then(response => dispatch(addPostCommentSuccess(response.data)))
          .catch(() => dispatch(addPostCommentFailed()));
  };
};

export const editPostCommentSuccess = comment => {
  return {
    type: ACTION_TYPES.EDIT_POST_COMMENT_SUCCESS,
    comment: comment,
  };
};
  
export const editPostCommentFailed = () => {
  return {
      type: ACTION_TYPES.EDIT_POST_COMMENT_FAIL,
  };
};

export const editPostComment = (data) => {
  return dispatch => {
      axios.put('/posts/comments', data)
          .then(response => dispatch(editPostCommentSuccess(response.data)))
          .catch(() => dispatch(editPostCommentFailed()));
  };
};

export const deletePostCommentSuccess = cid => {
  return {
    type: ACTION_TYPES.DELETE_POST_COMMENT_SUCCESS,
    cid: cid,
  };
};
  
export const deletePostCommentFailed = () => {
  return {
      type: ACTION_TYPES.DELETE_POST_COMMENT_FAIL,
  };
};

export const deletePostComment = cid => {
  return dispatch => {
      axios.delete('/posts/comment', { data: { cid: cid } })
          .then(response => dispatch(deletePostCommentSuccess(response.data.cid)))
          .catch(() => dispatch(deletePostCommentFailed()));
  };
};