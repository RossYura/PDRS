import { forge } from 'utils/common';
import NetworkService from './_abstract';
import StartupNetworkService from './Startup';
import UserNetworkService from './user';
import PortfolioNetworkService from './Portfolio';
import CompaniesNetworkService from './companies';
import NewsfeedNetworkService from './Newsfeed';
import ProfileNetworkService from './Profile';

export default {
  User: forge(UserNetworkService),
  Startup: forge(StartupNetworkService),
  Newsfeed: forge(NewsfeedNetworkService),
  Portfolio: forge(PortfolioNetworkService),
  companies: forge(CompaniesNetworkService),
  Profile: forge(ProfileNetworkService),
  errors: NetworkService.errors,
};