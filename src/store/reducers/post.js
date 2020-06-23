import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  posts: [],
  loadingPosts: false,
  loadingComments: false,
  comments: [],
  userPosts: [],
  added: false,
  edited: false,
  commentAdded: false,
};

const editPostCommentSuccess = (action, state) => {
  let comments = [...state.comments];
  let commentIndex = comments.findIndex(c => c.cid === action.comment.cid);
  comments[commentIndex] = action.comment;
  return {
    ...state,
    comments: comments,
  };
};

const deletePostSuccess = (action, state) => {
  let posts = [...state.posts];
  posts = posts.filter(p => p.pid !== action.pid);
  return {
    ...state,
    posts: posts,
  };
};

const deletePostCommentSuccess = (action, state) => {
  let allComments = [...state.comments];
  allComments = allComments.filter(c => c.cid !== action.cid);
  return {
    ...state,
    comments: allComments,
  };
};

const addPostLikeSuccess = (action, state) => {
  let allPosts = [...state.posts];
  let postcommentIndex = allPosts.findIndex(p => p.pid === action.pid);
  allPosts[postcommentIndex].likes = action.likes;
  return {
    ...state,
    posts: allPosts,
  };
};

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
      case ACTION_TYPES.ADD_POST_COMMENT_SUCCESS:
        return {
          ...state,
          commentAdded: true,
          comments: [action.comment, ...state.comments],
        }
      case ACTION_TYPES.ADD_POST_COMMENT_FAIL:
        return {
          ...state,
          commentAdded: false,
        }
      case ACTION_TYPES.EDIT_POST_COMMENT_SUCCESS:
        return editPostCommentSuccess(action, state);
      case ACTION_TYPES.EDIT_POST_COMMENT_FAIL:
        return {
          ...state,
        }
      case ACTION_TYPES.DELETE_POST_SUCCESS:
        return deletePostSuccess(action, state);
      case ACTION_TYPES.DELETE_POST_FAIL:
        return {
          ...state,
        }
      case ACTION_TYPES.DELETE_POST_COMMENT_SUCCESS:
        return deletePostCommentSuccess(action, state);
      case ACTION_TYPES.DELETE_POST_COMMENT_FAIL:
        return {
          ...state,
        }
      case ACTION_TYPES.ADD_POST_LIKE_SUCCESS:
        return addPostLikeSuccess(action, state);
      case ACTION_TYPES.ADD_POST_LIKE_FAIL:
        return {
          ...state,
        }
      case ACTION_TYPES.FETCH_POST_COMMENTS_START:
        return {
          ...state,
          loadingComments: true,
        }
      case ACTION_TYPES.FETCH_POST_COMMENTS_SUCCESS:
        return {
          ...state,
          loadingComments: false,
          comments: action.comments,
        }
      case ACTION_TYPES.FETCH_POST_COMMENTS_FAIL:
        return {
          ...state,
          loadingComments: false,
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