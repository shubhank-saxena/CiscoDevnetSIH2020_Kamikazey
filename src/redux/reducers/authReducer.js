/** @format */

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER, RESET_STATE } from '../types';

const defaultState = {
  token: null,
  userType: null,
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userType: action.payload.userType,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case LOGIN_FAIL:
    case LOGOUT_USER:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case RESET_STATE:
      return defaultState;
    default:
      return state;
  }
};
