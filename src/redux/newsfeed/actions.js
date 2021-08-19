import { GET_NEWSFEED, EXPAND_NEWSFEED } from './actionTypes';
import NetworkService from 'services/network';
import { EXPAND_NEWS_FEED_LOADING_KEY } from 'components/newsfeed/NewsfeedIndex/constants';

export const getNewsfeed = () => async dispatch => {
  return NetworkService.Newsfeed()
    .withLoader()
    .code200(({ data }) => {
      dispatch({ type: GET_NEWSFEED, data });
    })
    .err(NetworkService.errors.DEFAULT)
    .get();
};

export const expandNewsfeed = page => async dispatch => {
  return NetworkService.Newsfeed()
    .withLoaderKey(EXPAND_NEWS_FEED_LOADING_KEY)
    .code200(({ data }) => {
      dispatch({ type: EXPAND_NEWSFEED, payload: { data, page } });
    })
    .err(NetworkService.errors.DEFAULT)
    .get(page);
};
