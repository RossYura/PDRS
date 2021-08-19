import NetworkService from 'services/network/_abstract';
import {
  getCompaniesUrl,
  getMarkPaymentSendUrl
} from 'static/constants/apiUrls';

export default class PortfolioNetworkService extends NetworkService {
  get = () => this.makeRequest({
    url: getCompaniesUrl(),
    method: 'GET',
  });

  markPaymentSend = (matchId) => this.makeRequest({
    url: getMarkPaymentSendUrl(matchId),
    method: 'PUT',
  })
}