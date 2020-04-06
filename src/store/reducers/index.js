
import AuthReducer from './authReducer';
import UserReducer from './userReducer';
import PostReducer from './postReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  authReducer: AuthReducer,
  userReducer: UserReducer,
  postReducer: PostReducer,
});

export default rootReducer;