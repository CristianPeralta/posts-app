import * as ACTION_TYPES from './action_types';
import axios from '../../axios';

export const fetchPostsStart = () => {
    return {
        type: ACTION_TYPES.FETCH_POSTS_START,
    };
  };
  
  export const fetchPostsSuccess = posts => {
    return {
      type: ACTION_TYPES.FETCH_POSTS_SUCCESS,
      posts: posts
    }
  }
  
  export const fetchPostsFailed = (error) => {
    return {
        type: ACTION_TYPES.FETCH_POSTS_FAIL,
        error: error
    };
  };
  
  export const fetchPosts = (query) => {
    return dispatch => {
        dispatch(fetchPostsStart());
        axios.get('/posts', { params: { query }})
            .then(response => {
               dispatch(fetchPostsSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchPostsFailed(error));
            });
    };
  };