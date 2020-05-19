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
            .then(response => dispatch(getOtherUserSuccess(response.data[0])))
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

export const fetchOtherUserPosts = username => {
  return dispatch => {
      axios.get('/posts', { params: { username: username }})
          .then(response => {
              dispatch(fetchOtherUserPostsSuccess(response.data));
          })
          .catch(error => {
              dispatch(fetchOtherUserPostsFailed(error));
          });
  };
};

export const fetchUserMessagesSuccess = messages => {
  return {
    type: ACTION_TYPES.FETCH_USER_MESSAGES_SUCCESS,
    messages: messages,
  };
};
  
export const fetchUserMessagesFailed = (error) => {
  return {
      type: ACTION_TYPES.FETCH_USER_MESSAGES_SUCCESS,
      error: error,
  };
};

export const fetchUserMessages = username => {
  return dispatch => {
      axios.get('/users/messages', {params: {username: username}})
          .then(response => {
              dispatch(fetchUserMessagesSuccess(response.data));
          })
          .catch(error => {
              dispatch(fetchUserMessagesFailed(error));
          });
  };
};

export const deleteUserMessageSuccess = messages => {
  return {
    type: ACTION_TYPES.DELETE_USER_MESSAGE_SUCCESS,
  };
};
  
export const deleteUserMessageFailed = (error) => {
  return {
      type: ACTION_TYPES.DELETE_USER_MESSAGE_FAIL,
  };
};