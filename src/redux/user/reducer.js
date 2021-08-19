import {
  LOGIN_USER,
  SIGNUP_USER,
  USER_CHANGED,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  SHOW_LOADING,
  HIDE_LOADING,
} from './actionTypes';
import { SUBMIT_INVESTOR_STATEMENT_PROFILE } from 'redux/profile/actionTypes';
import { DATA_PROVIDERS_INITIALIZED } from 'redux/common/actionTypes';

const initialState = {
  current_user: null,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case DATA_PROVIDERS_INITIALIZED: {
    const { user } = action.payload;
    return {
      ...state,
      current_user: user,
    };
  }
  case LOGIN_USER:
  case SIGNUP_USER:
  case USER_CHANGED:
    return {
      ...state,
      current_user: action.payload,
    };

  case LOGOUT_USER:
    return {
      ...state,
      current_user: {},
    };

  case RESET_PASSWORD: {
    let { current_user } = state;
    current_user.authenticationToken = action.data.authenticationToken;

    return {
      ...state,
      current_user,
    };
  }

  case SUBMIT_INVESTOR_STATEMENT_PROFILE: {
    let { current_user } = state;
    if (!current_user) {
      current_user = {};
    }
    current_user.profileStatus = action.data.profileStatus;

    return {
      ...state,
      current_user,
    };
  }

  case FORGOT_PASSWORD:
    return {
      ...state,
    };

  case SHOW_LOADING:
    return {
      ...state,
      loading: true,
    };

  case HIDE_LOADING:
    return {
      ...state,
      loading: false,
    };

  default:
    return state;
  }
};

export default userReducer;