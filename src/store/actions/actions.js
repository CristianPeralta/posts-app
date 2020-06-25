import * as ACTION_TYPES from './action_types';

export {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailed,
  fetchPosts,
  addPostFailed,
  addPostSuccess,
  addPost,
  editPostSuccess,
  editPostFailed,
  editPost,
  fetchPostCommentsStart,
  fetchPostCommentsSuccess,
  fetchPostCommentsFailed,
  fetchPostComments,
  addPostCommentFailed,
  addPostCommentSuccess,
  addPostComment,
  editPostCommentFailed,
  editPostCommentSuccess,
  editPostComment,
  deletePostCommentFailed,
  deletePostCommentSuccess,
  deletePostComment,
  addPostLikeFailed,
  addPostLikeSuccess,
  addPostLike,
  deletePostFailed,
  deletePostSuccess,
  deletePost,
} from './post';

export {
  getOtherUserFailed,
  getOtherUserSuccess,
  getOtherUser,
  fetchOtherUserPostsFailed,
  fetchOtherUserPostsSuccess,
  fetchOtherUserPosts,
  fetchUserMessagesFailed,
  fetchUserMessagesSuccess,
  fetchUserMessages,
  deleteUserMessageFailed,
  deleteUserMessageSuccess,
  deleteUserMessage,
  sendUserMessageFailed,
  sendUserMessageSuccess,
  sendUserMessage,
} from './user';

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expiresAt');
  return {
    type: ACTION_TYPES.AUTH_LOGOUT,
  };
};


export const loginSuccess = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS
  }
}

export const loginFailure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE
  }
}

export const addProfile = (profile) => {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile
  }
}

export const removeProfile = () => {
  return {
    type: ACTION_TYPES.REMOVE_PROFILE
  }
}

export const saveProfile = (profile) => {
  return {
    type: ACTION_TYPES.SET_DB_PROFILE,
    payload: profile
  }
}

export const removeDbProfile = () => {
  return {
    type: ACTION_TYPES.REMOVE_DB_PROFILE
  }
}
