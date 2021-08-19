import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import * as Amplitude from 'expo-analytics-amplitude';

import {
  signupUserUrl,
  logoutUserUrl,
  forgotPasswordUrl,
} from 'static/constants/apiUrls';
import {
  LOGIN_USER,
  SIGNUP_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  SHOW_LOADING,
  HIDE_LOADING,
  USER_CHANGED,
} from './actionTypes';
import StorageService from 'services/storage';
import NetworkService from 'services/network';
import NavigationService from 'services/navigation';
import { getCurrentUser } from './selectors';
import {
  AMP_USER_LOG_IN,
  AMP_USER_SIGN_UP,
  AMP_SIGN_DOCUMENTS,
} from 'static/constants/amplitudeEventTypes';
import { setAmplitudeUserData } from 'services/analytics/amplitude';

export const signUserDocuments = (userId) => async () => await NetworkService.User()
  .withLoader()
  .code200(async ({ data: { user } }) => {
    const profileStatusNew = user.profile_status;
    const { profileStatus, ...userInfo } = await StorageService.User.get();
    if (profileStatus !== profileStatusNew) {
      await StorageService.User.set({
        ...userInfo,
        profileStatus: profileStatusNew,
      });
      Amplitude.logEvent(AMP_SIGN_DOCUMENTS);
      NavigationService.navigate('OnBoarding');
    }
  })
  .signDocuments(userId);

export const getUserProfileStatus = (userId) => async (dispatch) => await NetworkService.User()
  .withLoader()
  .code200(async ({ data: { user } }) => {
    const profileStatusNew = user.profileStatus;
    const { profileStatus } = await StorageService.User.get();
    dispatch(setUser(user));
    if (profileStatus !== profileStatusNew) {
      NavigationService.navigate('ESign');
    }
  })
  .getUser(userId);

export const putUser = userPartial => async (dispatch, getState) => {
  await StorageService.User.put(userPartial);

  dispatch({
    type: USER_CHANGED,
    payload: {
      ...getCurrentUser(getState()),
      ...userPartial,
    },
  });
};

export const setUser = user => async (dispatch) => {
  await StorageService.User.set(user);

  dispatch({
    type: USER_CHANGED,
    payload: user,
  });
};

export const loginUser = (payload) => async dispatch => {
  return NetworkService.User()
    .code200(async ({ data }) => {
      await StorageService.Common.set('password', payload.password);
      await StorageService.User.set(data.user);
      const newUser = await StorageService.User.get();
      dispatch({ type: LOGIN_USER, payload: newUser });
      showMessage({
        message: 'Welcome back!',
        type: 'success',
        floating: true,
        duration: 3700,
      });
      NavigationService.navigate('App', { from: 'login' });
      //analytics
      setAmplitudeUserData(data.user, AMP_USER_LOG_IN);
      //analytics
    })
    .err(NetworkService.errors.DEFAULT)
    .invalidCredentials401(() => {
      showMessage({
        message: 'Sign In Failed',
        description: 'Incorrect credentials - please try again',
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    })
    .withLoaderKey(LOGIN_USER)
    .logIn(payload);
};

export const signupUser = (payload) => async dispatch => {
  setLoading(true)(dispatch);
  let url = signupUserUrl();
  try {
    let { data } = await axios.post(url, {
      user: payload,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (data.status === 200) {
      await StorageService.Common.set('password', payload.password);
      await StorageService.User.set(data.user);
      dispatch({ type: SIGNUP_USER, payload: data.user });
      //analytics
      setAmplitudeUserData(data.user, AMP_USER_SIGN_UP);
      //analytics
    } else {
      throw(new Error('Please check your details'));
    }

    setLoading(false)(dispatch);
  } catch (error) {
    setLoading(false)(dispatch);
    throw error;
  }
};

export const forgotPassword = (payload) => async dispatch => {
  setLoading(true)(dispatch);
  let url = forgotPasswordUrl();
  try {
    let { data } = await axios.put(url, {
      user: payload,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (data.status === 200) {
      dispatch({ type: FORGOT_PASSWORD });
    } else {
      throw (new Error('Invalid email address'));
    }
    setLoading(false)(dispatch);
  } catch (error) {
    setLoading(false)(dispatch);
    throw error;
  }
};

export const logoutUser = () => async dispatch => {
  setLoading(true)(dispatch);
  let url = logoutUserUrl();
  try {
    let { data } = await axios.delete(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (data.status === 200) {
      dispatch(terminateSession());
    } else {
      throw (new Error('Please try again'));
    }
    setLoading(false)(dispatch);
  } catch (error) {
    setLoading(false)(dispatch);
    throw error;
  }
};

export const terminateSession = () => async dispatch => {
  await StorageService.User.remove();
  dispatch({ type: LOGOUT_USER });
};

export const resetPassword = (payload) => async dispatch => {
  setLoading(true)(dispatch);
  try {
    await StorageService.User.put({
      authenticationToken: payload.authenticationToken,
    });
    dispatch({ type: RESET_PASSWORD, data: payload.authenticationToken });
  } catch (error) {
    setLoading(false)(dispatch);
    throw error;
  }
};

export const setLoading = (loading) => dispatch => {
  dispatch({ type: loading ? SHOW_LOADING : HIDE_LOADING });
};
