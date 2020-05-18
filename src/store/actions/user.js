import * as ACTION_TYPES from './action_types';
import axios from '../../axios';

export const getOtherUserSuccess = user => {
  return {
    type: ACTION_TYPES.GET_OTHER_USER_SUCCESS,
    user: user,
  };
};
  
export const getOtherUserFailed = (error) => {
  return {
      type: ACTION_TYPES.GET_OTHER_USER_FAIL,
      error: error,
  };
};

export const getOtherUser = username => {
    return dispatch => {
        axios.get('/users', { params: { username: username }})
            .then(() => dispatch(getOtherUserSuccess()))
            .catch(() => dispatch(getOtherUserFailed()));
    };
  };

export const fetchOtherUserPostsSuccess = posts => {
  return {
    type: ACTION_TYPES.FETCH_OTHER_USER_POSTS_SUCCESS,
    posts: posts,
  };
};
  
export const fetchOtherUserPostsFailed = (error) => {
  return {
      type: ACTION_TYPES.FETCH_OTHER_USER_POSTS_FAIL,
      error: error,
  };
};