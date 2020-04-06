import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  userText: ''
}

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.USER_INPUT:
        return {
          ...state,
          userText: action.payload
        }
      default:
        return state
    }
}

export default UserReducer;