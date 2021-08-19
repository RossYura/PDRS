import NetworkService from 'services/network/_abstract';
import {
  getStartupsUrl,
  investStartupUrl,
  matchDisableUrl,
  getProspectMatchesUrl,
  setProspectMatchUrl,
} from 'static/constants/apiUrls';

export default class StartupNetworkService extends NetworkService {

  code204 = callback => {
    this.callbacks.success.push({
      condition: response => response.data.status === 204,
      callback,
      priority: 0,
    });
    return this;
  };

  get = () => this.makeRequest({
    url: getStartupsUrl(),
    method: 'GET',
  });

  getProspectMatches = () => this.makeRequest({
    url: getProspectMatchesUrl,
    method: 'GET',
  });

  setProspectMatch = (id, voted) => this.makeRequest({
    url: setProspectMatchUrl(id),
    method: 'PUT',
    data: {
      prospect_match: {
        response: voted
          ? '+1'
          : '-1',
      },
    },
  });

  invest = (investment_entity_id, selectedMatchId, count) => this.makeRequest({
    url: investStartupUrl(selectedMatchId),
    method: 'POST',
    data: {
      chip_count: count,
      investment_entity_id,
    },
  });

  disableMatch = (matchId, declineReason) => this.makeRequest({
    url: matchDisableUrl(matchId),
    method: 'PUT',
    data: {
      declineReason,
    },
  });
}