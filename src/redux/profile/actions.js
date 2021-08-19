import * as Amplitude from 'expo-analytics-amplitude';

import {
  GET_KEYWORDS,
} from './actionTypes';
import { putUser } from 'redux/user/actions';
import NetworkService from 'services/network';
import { navigate } from 'services/navigation/actions';
import { showMessage } from 'react-native-flash-message';
import {
  AMP_USER_SIGN_UP_COMPLETE,
} from 'static/constants/amplitudeEventTypes';

export const submitGeneralProfile = profile => async dispatch => {
  NetworkService.Profile()
    .withLoaderKey('authSubmitting')
    .code200(({ data }) => {
      dispatch(putUser(data.user));
      navigate('ProfileForm2');
    })
    .err(() => {
      showMessage({
        message: 'Oops, there was a problem with your details',
        description: 'We have been notified, please try again',
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    })
    .submitGeneral(profile);
};

export const submitQuiz = () => async dispatch => {
  NetworkService.Profile()
    .withLoaderKey('authSubmitting')
    .code200(({ data }) => {
      dispatch(putUser(data.user));
      navigate('ProfileForm3');
    })
    .submitQuiz();
};

export const getKeywords = () => async dispatch => {
  NetworkService.Profile()
    .withLoaderKey('authSubmitting')
    .code200(({ data }) => {
      dispatch({
        type: GET_KEYWORDS,
        data
      });
    })
    .err(() => {
      showMessage({
        message: 'Oops, there was a problem with keywords',
        description: 'We have been notified, please try again',
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    })
    .getKeywords();
};

export const submitExpertiseProfile = profile => async dispatch => {
  NetworkService.Profile()
    .withLoaderKey('authSubmitting')
    .code200(({ data }) => {
      dispatch(putUser(data.user));
      navigate('ProfileForm4');
    })
    .submitExpertiseProfile(profile);
};

export const submitInvestorStatementProfile = profile => async dispatch => {
  await NetworkService.Profile()
    .withLoaderKey('authSubmitting')
    .code200(async ({ data }) => {
      dispatch(putUser(data.user));
      // navigate('Processing');
      await Amplitude.setUserId(data.user.id.toString());
      Amplitude.logEvent(AMP_USER_SIGN_UP_COMPLETE);
    })
    .submitInvestorStatementProfile(profile);
};