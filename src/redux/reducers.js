import { combineReducers } from 'redux';

import UserReducer from './user/reducer';
import ProfileReducer from './profile/reducer';
import StartupReducer from './startup/reducer';
import PortfolioReducer from './portfolio/reducer';
import NewsfeedReducer from './newsfeed/reducer';
import commonReducer from './common/reducer';
import companiesReducer from './companies/reducer';

export default combineReducers({
  User: UserReducer,
  Profile: ProfileReducer,
  Startup: StartupReducer,
  Portfolio: PortfolioReducer,
  Newsfeed: NewsfeedReducer,
  common: commonReducer,
  companies: companiesReducer
});