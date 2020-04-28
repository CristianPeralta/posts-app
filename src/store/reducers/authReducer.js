
import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  isAuthenticated: false,
  profile: null,
  dbProfile: null,
};

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true
        }
      case ACTION_TYPES.LOGIN_FAILURE:
        return {
          ...state,
          isAuthenticated: false
        }
      case ACTION_TYPES.ADD_PROFILE:
        return {
          ...state,
          profile: action.payload
        }
      case ACTION_TYPES.REMOVE_PROFILE:
        return {
          ...state,
          profile: null
        }
      case ACTION_TYPES.SET_DB_PROFILE:
        return {
          ...state,
          dbProfile: action.payload
        }
      case ACTION_TYPES.REMOVE_DB_PROFILE:
        return {
          ...state,
          dbProfile: null
        }
      case ACTION_TYPES.AUTH_LOGOUT:
        return {
          ...state,
          dbProfile: null,
          profile: null,
          isAuthenticated: false,
        }
      default:
        return state
    }
}

export default AuthReducer;