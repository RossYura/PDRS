import NetworkService from 'services/network/_abstract';
import {
  investmentContractsUrl,
  loginUserUrl,
  profilePictureUrl,
  getUserUrl,
  signDocumentsUrl,
  helpRequestUrl,
  profileDetailsProtectedUpdateUrl,
  resetPasswordUrl,
  reactivateUserUrl,
  sendContractsUrl,
} from 'static/constants/apiUrls';

export default class UserNetworkService extends NetworkService {
  invalidCredentials401 = callback => {
    this.callbacks.error.push({
      condition: error => error.response && error.response.status === 401,
      callback,
      priority: 2,
    });

    return this;
  };

  reactivate = userId => this.makeRequest({
    url: reactivateUserUrl(userId),
    method: 'PUT',
  });

  modifyUser = (userId, payload) => this.makeRequest({
    url: getUserUrl(userId),
    method: 'PUT',
    data: payload,
  });

  modifyUserProtected = (userId, password, payload) => this.makeRequest({
    url: profileDetailsProtectedUpdateUrl(userId),
    method: 'PUT',
    data: {
      password,
      user: payload
    },
  });

  getUser = userId => this.makeRequest({
    url: getUserUrl(userId),
  });

  signDocuments = userId => this.makeRequest({
    url: signDocumentsUrl(userId),
    method: 'PUT',
  });

  getInvestmentContracts = (userId) => this.makeRequest({
    url: investmentContractsUrl(userId),
  });

  logIn = (user) => this.makeRequest({
    url: loginUserUrl,
    method: 'POST',
    data: {
      user,
    },
  });

  changeProfilePicture = (userId, pictureData) => this.makeRequest({
    method: 'PUT',
    url: profilePictureUrl(userId),
    data: pictureData,
  });

  helpRequest = (userId, text) => this.makeRequest({
    url: helpRequestUrl(userId),
    method: 'POST',
    data: text,
  });

  resetPassword = user => this.makeRequest({
    url: resetPasswordUrl,
    method: 'PUT',
    data: {
      user
    },
  });

  sendContracts = (email) => this.makeRequest({
    url: sendContractsUrl,
    method: 'POST',
    data: {
      user: {
        email,
      }      
    },
  });
}