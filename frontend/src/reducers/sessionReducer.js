import {
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
  RECEIVE_CURRENT_USER
} from '../actions/sessionActions';

const initialState = {
  isAuthenticated: false,
  user: {},
};


export default function (state = initialState, action) {
  switch (action.type) {

    case RECEIVE_USER_LOGOUT: return { isAuthenticated: false, user: undefined };

    case RECEIVE_USER_SIGN_IN: return { ...state, isSignedUp: true }

    case RECEIVE_CURRENT_USER: return receiveCurrentUser(state, action)

    default:
      return state;
  }
}



function receiveCurrentUser(state, action) {

  return {
    ...state,
    isAuthenticated: !!action.currentUser,
    user: action.currentUser
  }
}