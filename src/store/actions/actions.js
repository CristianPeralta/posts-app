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

export const SUCCESS = {
  type: ACTION_TYPES.SUCCESS
}

export const FAILURE = {
  type: ACTION_TYPES.FAILURE
}

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expiresAt');
  return {
    type: ACTION_TYPES.AUTH_LOGOUT,
  };
};

export const success = () => {
  return {
    type: ACTION_TYPES.SUCCESS
  }
}

export const failure = () => {
  return {
    type: ACTION_TYPES.FAILURE
  }
}

export const userInput = (text) => {
  return {
    type: ACTION_TYPES.USER_INPUT,
    payload: text
  }
}

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

export const fetchUserPosts = posts => {
  return {
    type: ACTION_TYPES.FETCH_USER_POSTS,
    payload: posts
  }
}

export const removeUserPosts = () => {
  return {
    type: ACTION_TYPES.REMOVE_USER_POSTS
  }
}

export const setOtherUserProfile = profile => {
  return {
    type: ACTION_TYPES.SET_OTHER_USER_PROFILE,
    payload: profile
  }
}

export const removeOtherUserProfile = () => {
  return {
    type: ACTION_TYPES.REMOVE_OTHER_USER_PROFILE
  }
}

export const setOtherUserPosts = posts => {
  return {
    type: ACTION_TYPES.SET_OTHER_USER_POSTS,
    payload: posts
  }
}

export const removeOtherUserPosts = () => {
  return {
    type: ACTION_TYPES.REMOVE_OTHER_USER_POSTS
  }
}

export const setUserMessages = messages => {
  return {
    type: ACTION_TYPES.SET_USER_MESSAGES,
    payload: messages
  }
}

export const removeUserMessages = () => {
  return {
    type: ACTION_TYPES.REMOVE_USER_MESSAGES
  }
}