import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  posts: [],
  loadingPosts: false,
  comments: [],
  userPosts: [],
  searchPosts: []
}

const PostReducer = (state = initialState, action) => {
    switch(action.type) {
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
      case ACTION_TYPES.FETCH_DB_POSTS:
        return {
          ...state,
          posts: action.payload
        }
      case ACTION_TYPES.REMOVE_DB_POSTS:
        return {
          ...state,
          posts: []
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
      case ACTION_TYPES.SEARCH_POSTS_SUCCESS:
        return {
          ...state,
          searchPosts: action.payload
        }
      case ACTION_TYPES.SEARCH_POSTS_FAILURE:
        return {
          ...state,
          searchPosts: []
        }
      default:
        return state
    }
}

export default PostReducer;