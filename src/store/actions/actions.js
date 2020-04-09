import * as ACTION_TYPES from './action_types';

export const SUCCESS = {
  type: ACTION_TYPES.SUCCESS
}

export const FAILURE = {
  type: ACTION_TYPES.FAILURE
}

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