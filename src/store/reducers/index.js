
import AuthReducer from './auth_reducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  auth_reducer: AuthReducer,
});

export default rootReducer;