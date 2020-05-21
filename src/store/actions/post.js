import * as ACTION_TYPES from './action_types';
import * as api from '../../api';

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
      api.fetchPosts(query)
          .then(data => {
              dispatch(fetchPostsSuccess(data));
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
      api.addPost(data)
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
      api.editPost(data)
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
      api.fetchPostComments(params)
          .then(data => {
              dispatch(fetchPostCommentsSuccess(data));
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
      api.addPostComment(data)
          .then(data => dispatch(addPostCommentSuccess(data)))
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
      api.editPostComment(data)
          .then(data => dispatch(editPostCommentSuccess(data)))
          .catch(() => dispatch(editPostCommentFailed()));
  };
};

export const deletePostSuccess = pid => {
  return {
    type: ACTION_TYPES.DELETE_POST_SUCCESS,
    pid: pid,
  };
};

export const deletePostFailed = () => {
  return {
      type: ACTION_TYPES.DELETE_POST_FAIL,
  };
};

export const deletePost = pid => {
  console.log('deletePost', deletePost);
  return dispatch => {
      api.deletePostComments(pid)
          .then(() => api.deletePost(pid))
          .then(data => dispatch(deletePostSuccess(data.pid)))
          .catch(() => dispatch(deletePostFailed()));
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
      api.deletePostComment(cid)
          .then(data => dispatch(deletePostCommentSuccess(data.cid)))
          .catch(() => dispatch(deletePostCommentFailed()));
  };
};

export const addPostLikeSuccess = post => {
  return {
    type: ACTION_TYPES.ADD_POST_LIKE_SUCCESS,
    pid: post.pid,
    likes: post.likes,
  };
};
  
export const addPostLikeFailed = () => {
  return {
      type: ACTION_TYPES.ADD_POST_LIKE_FAIL,
  };
};

export const addPostLike = data => {
  return dispatch => {
      api.addPostLike(data)
          .then(data => dispatch(addPostLikeSuccess(data)))
          .catch(() => dispatch(addPostLikeFailed()));
  };
};