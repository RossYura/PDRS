import axios from 'axios';

import StorageService from 'services/storage/_abstract';
import SentryService from 'services/analytics/sentry';

export default class UserStorageService extends StorageService {
  constructor (...args) {
    super(...args);
  }

  set = async (user) => {
    axios.defaults.headers.common['X-User-Email'] = user.email;
    axios.defaults.headers.common['X-User-Token'] = user.authenticationToken;

    await StorageService.prototype.set.call(this, {
      ...user,
      userId: user.id
    });

    await SentryService.setUserContext(user);
  }

  put = async userPartial => {
    await StorageService.prototype.put.call(this, userPartial);

    const newUser = await this.get();

    axios.defaults.headers.common['X-User-Email'] = newUser.email;
    axios.defaults.headers.common['X-User-Token'] = newUser.authenticationToken;

    await SentryService.setUserContext(newUser);
  }

}
