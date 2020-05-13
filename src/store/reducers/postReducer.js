import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  posts: [],
  loadingPosts: false,
  comments: [],
  userPosts: [],
  added: false,
  edited: false,
}

const PostReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.ADD_POST_SUCCESS:
        return {
          ...state,
          added: true,
        }
      case ACTION_TYPES.ADD_POST_FAIL:
        return {
          ...state,
          added: false,
        }
      case ACTION_TYPES.EDIT_POST_SUCCESS:
        return {
          ...state,
          edited: true,
        }
      case ACTION_TYPES.EDIT_POST_FAIL:
        return {
          ...state,
          edited: false,
        }
      case ACTION_TYPES.FETCH_POSTS_START:
        return {
          ...state,
          loadingPosts: true
        }
      case ACTION_TYPES.FETCH_POSTS_SUCCESS:
        return {
          ...state,
          loadingPosts: false,
          posts: action.posts
        }
      case ACTION_TYPES.FETCH_POSTS_FAIL:
        return {
          ...state,
          loadingPosts: false
        }
      case ACTION_TYPES.FETCH_POSTS_COMMENTS:
        return {
          ...state,
          comments: action.payload
        }
      case ACTION_TYPES.REMOVE_POSTS_COMMENTS:
        return {
          ...state,
          comments: []
        }
      case ACTION_TYPES.FETCH_USER_POSTS:
        return {
          ...state,
          userPosts: action.payload
        }
      case ACTION_TYPES.REMOVE_USER_POSTS:
        return {
          ...state,
          userPosts: []
        }
      default:
        return state
    }
}

export default PostReducer;