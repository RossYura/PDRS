import axios from 'axios';

export const ensureProtocolProvided = url => {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = 'http://' + url;
  }

  return url;
};

export const replaceLocalhostToUrl = url => {
  const actualIP = axios.defaults.baseURL;

  return url.replace('http://localhost:3000', actualIP);
};

export const getFileNameFromUrl = (url) => {
  if (url) {
    const m = url.toString()
      .match(/.*\/(.+?\..+)/);
    if (m && m.length > 1) {
      return m[1];
    }
  }
  return '';
};

export const extractQueryStringParams = (url) => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  let params = {};
  let match;
  while (match = regex.exec(url)) {
    params[match[1]] = match[2];
  }

  return params;
};