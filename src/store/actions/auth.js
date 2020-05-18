import * as ACTION_TYPES from './action_types';

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