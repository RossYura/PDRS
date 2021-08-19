import {
  HIDE_MODAL,
  SHOW_MODAL,
  TOGGLE_MODAL,
  ENABLE_LOADER,
  DISABLE_LOADER,
  SWITCH_MODAL,
  DATA_PROVIDERS_INITIALIZED,
} from './actionTypes';
import StorageService from 'services/storage';
import { isEmpty } from 'utils/common';
import SentryService from 'services/analytics/sentry';

export const initializeDataProviders = () => async (dispatch) => {
  const [
    user
  ] = await Promise.all([
    StorageService.User.get(),
  ]);

  if(!isEmpty(user)) {
    await SentryService.setUserContext(user);
  }

  dispatch({
    type: DATA_PROVIDERS_INITIALIZED,
    payload: {
      user,
    },
  });
};

export const showModal = (modalName, modalParams) => ({
  type: SHOW_MODAL,
  payload: {
    modalName,
    modalParams,
  },
});

export const hideModal = (modalName, keepParams = false) => ({
  type: HIDE_MODAL,
  payload: {
    modalName,
    keepParams,
  },
});

export const toggleModal = (modalName) => ({
  type: TOGGLE_MODAL,
  payload: {
    modalName,
  },
});

export const switchModal = (
  from,
  to,
  additionalModalParams = {},
  delay,
  keepPayload = true,
) => ({
  type: SWITCH_MODAL,
  payload: {
    from,
    to,
    additionalModalParams,
    keepPayload,
  },
});

export const enableLoader = (loaderKey) => ({
  type: ENABLE_LOADER,
  payload: loaderKey,
});

export const disableLoader = (loaderKey) => ({
  type: DISABLE_LOADER,
  payload: loaderKey,
});

