
import AuthReducer from './authReducer';
import UserReducer from './userReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  authReducer: AuthReducer,
  userReducer: UserReducer,
});

export default rootReducer;