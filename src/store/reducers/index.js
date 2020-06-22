
import AuthReducer from './auth';
import UserReducer from './user';
import PostReducer from './post';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  post: PostReducer,
});

export default rootReducer;