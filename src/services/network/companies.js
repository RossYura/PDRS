import NetworkService from 'services/network/_abstract';
import {
  getCompaniesWithPendingInvestmentsUrl,
  getCompanyByIdUrl
} from 'static/constants/apiUrls';

export default class CompaniesNetworkService extends NetworkService {

  getCompaniesWithPendingInvestments = () => this.makeRequest({
    url: getCompaniesWithPendingInvestmentsUrl,
    method: 'GET',
  });

  getCompanyById = id => this.makeRequest({
    url: getCompanyByIdUrl(id),
    method: 'GET',
  });
}