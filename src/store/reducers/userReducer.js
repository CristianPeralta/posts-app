import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  userText: '',
  otherUserProfile: '',
  otherUserPosts: []
}

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
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
      default:
        return state
    }
}

export default UserReducer;