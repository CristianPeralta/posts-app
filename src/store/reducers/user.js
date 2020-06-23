import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  userText: '',
  otherUserProfile: '',
  otherUserPosts: [],
  userMessages: [],
};

const deleteUserMessageSuccess = (action, state) => {
  let allMessages = [...state.userMessages];
  allMessages = allMessages.filter(m => m.mid !== action.mid);
  return {
    ...state,
    userMessages: allMessages,
  };
};

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.GET_OTHER_USER_SUCCESS:
        return {
          ...state,
          otherUserProfile: action.user
        }
      case ACTION_TYPES.GET_OTHER_USER_FAIL:
        return {
          ...state,
          otherUserProfile: null
        }
      case ACTION_TYPES.FETCH_OTHER_USER_POSTS_SUCCESS:
        return {
          ...state,
          otherUserPosts: action.posts,
        }
      case ACTION_TYPES.FETCH_OTHER_USER_POSTS_FAIL:
        return {
          ...state,
          otherUserPosts: [],
        }
      case ACTION_TYPES.USER_INPUT:
        return {
          ...state,
          userText: action.payload
        }
      case ACTION_TYPES.SET_OTHER_USER_PROFILE:
        return {
          ...state,
          otherUserProfile: action.payload
        }
      case ACTION_TYPES.REMOVE_OTHER_USER_PROFILE:
        return {
          ...state,
          otherUserProfile: null
        }
      case ACTION_TYPES.SET_OTHER_USER_POSTS:
        return {
          ...state,
          otherUserPosts: action.payload
        }
      case ACTION_TYPES.REMOVE_OTHER_USER_POSTS:
        return {
          ...state,
          otherUserPosts: []
        }
      case ACTION_TYPES.FETCH_USER_MESSAGES_SUCCESS:
        return {
          ...state,
          userMessages: action.messages,
        }
      case ACTION_TYPES.FETCH_USER_MESSAGES_FAIL:
        return {
          ...state,
          userMessages: [],
        }
      case ACTION_TYPES.SET_USER_MESSAGES:
        return {
          ...state,
          userMessages: action.payload
        }
      case ACTION_TYPES.REMOVE_USER_MESSAGES:
        return {
          ...state,
          userMessages: []
        }
      case ACTION_TYPES.SEND_MESSAGE_SUCCESS:
        return {
          ...state,
          userMessages: [action.message, ...state.userMessages],
        }
      case ACTION_TYPES.SEND_MESSAGE_FAIL:
        return {
          ...state,
        }
      case ACTION_TYPES.DELETE_USER_MESSAGE_SUCCESS:
        return deleteUserMessageSuccess(action, state);
      case ACTION_TYPES.DELETE_USER_MESSAGE_FAIL:
        return {
          ...state,
        }
      default:
        return state
    }
}

export default UserReducer;