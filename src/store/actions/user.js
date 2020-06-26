import * as ACTION_TYPES from './action_types';
import * as api from '../../api';

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
        api.getProfile(username)
            .then(data => dispatch(getOtherUserSuccess(data)))
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
      api.fetchUserPosts(username)
          .then(data => {
              dispatch(fetchOtherUserPostsSuccess(data));
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
      api.fetchUserMessages(username)
          .then(data => {
              dispatch(fetchUserMessagesSuccess(data));
          })
          .catch(error => {
              dispatch(fetchUserMessagesFailed(error));
          });
  };
};

export const deleteUserMessageSuccess = mid => {
  return {
    type: ACTION_TYPES.DELETE_USER_MESSAGE_SUCCESS,
    mid: mid,
  };
};

export const deleteUserMessageFailed = () => {
  return {
      type: ACTION_TYPES.DELETE_USER_MESSAGE_FAIL,
  };
};

export const deleteUserMessage = mid => {
  return dispatch => {
      api.deleteMessages(mid)
          .then(data => {
              dispatch(deleteUserMessageSuccess(data.mid));
          })
          .catch(() => {
              dispatch(deleteUserMessageFailed());
          });
  };
};

export const sendUserMessageSuccess = message => {
  return {
    type: ACTION_TYPES.SEND_MESSAGE_SUCCESS,
    message: message,
  };
};

export const sendUserMessageFailed = () => {
  return {
      type: ACTION_TYPES.SEND_MESSAGE_FAIL,
  };
};

export const sendUserMessage = data => {
  return dispatch => {
      api.sendMessage(data)
          .then(data => {
              dispatch(sendUserMessageSuccess(data));
          })
          .catch(() => {
              dispatch(sendUserMessageFailed());
          });
  };
};
