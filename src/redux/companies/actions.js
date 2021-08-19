import { showMessage } from 'react-native-flash-message';

import {
  COMPANIES_WITH_INVESTMENTS_RECEIVED
} from './actionTypes';
import NetworkService from 'services/network';

export const getCompaniesWithPendingInvestments = () => async dispatch => {
  return NetworkService.companies()
    .code200(({ data }) => {
      dispatch({ type: COMPANIES_WITH_INVESTMENTS_RECEIVED, payload: data.companies });
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
    .getCompaniesWithPendingInvestments();
};
