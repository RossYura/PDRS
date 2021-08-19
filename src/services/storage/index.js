import UserStorageService from './user';
import Common from './common';

export default {
  Common,
  User: new UserStorageService('USER'),
};