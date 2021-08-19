import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

import {
  getCompanyByIdUrl,
} from 'static/constants/apiUrls';

import {
  GET_PORTFOLIO,
  GET_PORTFOLIO_UPDATE_LOGS,
  ACTIVE_SECTIONS_UPDATE,
  GET_COMPANY_NEWSFEED,
  EXPAND_COMPANY_NEWSFEED
} from './actionTypes';
import NetworkService from 'services/network';
import { EXPAND_COMPANY_NEWS_FEED_LOADING_KEY } from 'components/portfolio/PortfolioShow/constants';

export const getPortfolio = () => async dispatch => {
  return NetworkService.Portfolio()
    .withLoader()
    .code200(({ data }) => {
      dispatch({ type: GET_PORTFOLIO, data });
    })
    .err(() => {
      showMessage({
        message: 'Oops, something went wrong!',
        description: 'We have been notified, please try again',
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    })
    .get();
};

export const getCompanyNewsfeed = (companyId) => async dispatch => {
  return NetworkService.Newsfeed()
    .withLoader()
    .code200(({ data }) => {
      dispatch({ type: GET_COMPANY_NEWSFEED, data });
    })
    .err(NetworkService.errors.DEFAULT)
    .getCompanySpecific(companyId);
};

export const expandCompanyNewsfeed = (companyId, page) => async dispatch => {
  return NetworkService.Newsfeed()
    .withLoaderKey(EXPAND_COMPANY_NEWS_FEED_LOADING_KEY)
    .code200(({ data }) => {
      dispatch({ type: EXPAND_COMPANY_NEWSFEED, payload: { data, page } });
    })
    .err(NetworkService.errors.DEFAULT)
    .getCompanySpecific(companyId, page);
};


export const getPortfolioShowById = companyId => async dispatch => {
  let url = getCompanyByIdUrl(companyId);
  try {
    let { data } = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (data.status === 200) {
      dispatch({ type: GET_PORTFOLIO_UPDATE_LOGS, data });
    }
  } catch (error) {
    throw(error);
  }
};

export const updateActiveSections = sections => ({
  type: ACTIVE_SECTIONS_UPDATE,
  data: sections
});