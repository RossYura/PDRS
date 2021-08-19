import NetworkService from 'services/network/_abstract';
import {
  getNewsfeedUrl,
  getCompanyNewsfeedUrl,
  getNewssfeedByIdUrl
} from 'static/constants/apiUrls';

export default class NewsfeedNetworkService extends NetworkService {
  get = page => this.makeRequest({
    url: getNewsfeedUrl(page),
    method: 'GET',
  });

  getById = id => this.makeRequest({
    url: getNewssfeedByIdUrl(id),
    method: 'GET',
  });

  getCompanySpecific = (companyId, page) => this.makeRequest({
    url: getCompanyNewsfeedUrl(companyId, page),
    method: 'GET',
  });
}