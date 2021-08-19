import * as Network from 'expo-network';
import * as Sentry from 'sentry-expo';
import { SENTRY_URL } from 'react-native-dotenv';

const SentryService = {
  initialized: false,

  init: () => {
    Sentry.init({
      dsn: SENTRY_URL,
      enableInExpoDevelopment: false,
      debug: true,
    });

    SentryService.initialized = true;
  },

  ensureInit: () => {
    if (!SentryService.initialized) {
      SentryService.init();
    }
  },

  setUserContext: async user => {
    const ip = await Network.getIpAddressAsync();
    Sentry.configureScope(function (scope) {

      scope.setUser({
        id: user.id,
        email: user.email,
        username: `${user.firstName} ${user.lastName}`,
        role: user.role,
        ip_address: ip,
      });
    });
  },
};

export default SentryService;