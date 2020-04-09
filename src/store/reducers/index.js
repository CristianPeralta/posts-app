
import AuthReducer from './authReducer';
import UserReducer from './userReducer';
import PostReducer from './postReducer';
import Reducer1 from './reducer1';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  reducer1: Reducer1,
  auth: AuthReducer,
  user: UserReducer,
  post: PostReducer,
});

export default rootReducer;