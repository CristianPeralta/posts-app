import * as ACTION_TYPES from './action_types';
import auth from '././../../utils/auth';

export const SUCCESS = {
  type: ACTION_TYPES.SUCCESS
}

export const FAILURE = {
  type: ACTION_TYPES.FAILURE
}

export const login = () => {
  const loginData = auth.auth0.authorize();
  console.log('loginData', loginData);
  return {
    type: ACTION_TYPES.AUTH_LOGIN
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
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

export const fetchPosts = posts => {
  return {
    type: ACTION_TYPES.FETCH_DB_POSTS,
    payload: posts
  }
}

export const removePosts = () => {
  return {
    type: ACTION_TYPES.REMOVE_DB_POSTS
  }
}

export const fetchPostComments = comments => {
  return {
    type: ACTION_TYPES.FETCH_POSTS_COMMENTS,
    payload: comments
  }
}

export const removePostComments = () => {
  return {
    type: ACTION_TYPES.REMOVE_POSTS_COMMENTS
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

export const fetchSearchPosts = posts => {
  return {
    type: ACTION_TYPES.SEARCH_POSTS_SUCCESS,
    payload: posts
  }
}

export const removeSearchPosts = () => {
  return {
    type: ACTION_TYPES.SEARCH_POSTS_FAILURE
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