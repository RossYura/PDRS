import NetworkService from 'services/network/_abstract';
import {
  submitGeneralProfileUrl,
  submitQuizUrl,
  getKeywordsUrl,
  submitExpertiseProfileUrl,
  submitInvestorStatementProfileUrl,
} from 'static/constants/apiUrls';

export default class PortfolioNetworkService extends NetworkService {
  submitGeneral = profile => this.makeRequest({
    url: submitGeneralProfileUrl,
    method: 'PUT',
    data: profile,
  });

  submitQuiz = () => this.makeRequest({
    url: submitQuizUrl,
    method: 'PUT',
  });

  getKeywords = () => this.makeRequest({
    url: getKeywordsUrl,
    method: 'GET',
  });

  submitExpertiseProfile = profile => this.makeRequest({
    url: submitExpertiseProfileUrl,
    method: 'PUT',
    data: {
      profile
    }
  });

  submitInvestorStatementProfile = profile => this.makeRequest({
    url: submitInvestorStatementProfileUrl,
    method: 'PUT',
    data: {
      profile
    }
  });
}