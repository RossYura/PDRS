import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

import store from 'redux/store';
import { enableLoader, disableLoader } from 'redux/common/actions';
import { terminateSession } from 'redux/user/actions';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default class NetworkService {

  static errors = {
    DEFAULT: () => {
      showMessage({
        message: 'Oops, something went wrong!',
        description: 'We have been notified, please try again',
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    },
    NETWORK: () => {
      showMessage({
        message: 'Network problems detected',
        description: 'Please check you connection or try again later',
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    },
    AUTH: () => {
      showMessage({
        message: 'Couldn\'t Authenticate You',
        description: 'Please sign in again',
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    },
  };

  constructor () {
    this.loader = false;
    this.config = {};
    this.callbacks = {
      success: [],
      error: [
        {
          condition: error => !error.response,
          callback: this.constructor.errors.NETWORK,
          priority: 1,
        },
        {
          condition: error =>error.response?.status === 401,
          callback: async () => {
            this.constructor.errors.AUTH();
            store.dispatch(terminateSession());
          },
          priority: 1,
        },
      ],
    };
  }

  mutateConfig = config => {
    this.config = {
      ...this.config,
      ...config,
    };
    return this;
  };

  overrideConfig = config => {
    this.config = config;
    return this;
  };

  withLoader = () => {
    this.loader = true;
    return this;
  };

  withLoaderKey = key => {
    this.loaderKey = key;
    return this;
  };

  code200 = callback => {
    this.callbacks.success.push({
      condition: response => response.data.status === 200 || response.status ===
        200,
      callback,
      priority: 0,
    });
    return this;
  };

  err = callback => {
    this.callbacks.error.push({
      condition: error => error.response && error.response.status >= 400,
      callback,
      priority: 0,
    });
    return this;
  };

  addCustomCallback = (type, condition, callback) => {
    this.callbacks[type].push({
      condition,
      callback,
    });
    return this;
  };

  propagateError = () => {
    this.errorPropagation = true;

    return this;
  };

  makeRequest = async ({
    url, method = 'GET', data,
  }) => {
    const { config, loaderKey, errorPropagation } = this;
    try {
      if (loaderKey) {
        store.dispatch(enableLoader(loaderKey));
      }

      const response = await axios({
        method,
        url,
        data,
        ...config,
      });

      const topPriority = Math.max.apply(
        null,
        this.callbacks.success.map(({ priority }) => priority),
      );
      const passedCallbacks = this.callbacks.success
        .filter(callback => callback.condition(response))
        .filter(callback => callback.priority === topPriority);

      for (const entry of passedCallbacks) {
        await entry.callback(response);
      }

      if (loaderKey) {
        store.dispatch(disableLoader(loaderKey));
      }
    } catch (error) {
      const passedCallbacksPrimary = this.callbacks.error
        .filter(callback => callback.condition(error));

      const topPriority = Math.max.apply(
        null,
        passedCallbacksPrimary.map(({ priority }) => priority),
      );

      const passedCallbacksFinal = passedCallbacksPrimary
        .filter(callback => callback.priority === topPriority);

      for (const entry of passedCallbacksFinal) {
        await entry.callback(error);
      }

      if (loaderKey) {
        store.dispatch(disableLoader(loaderKey));
      }
      if (errorPropagation) {
        throw error;
      }
    }
  };
}