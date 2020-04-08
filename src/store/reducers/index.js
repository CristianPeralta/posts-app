
import AuthReducer from './authReducer';
import UserReducer from './userReducer';
import PostReducer from './postReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  post: PostReducer,
});

export default rootReducer;