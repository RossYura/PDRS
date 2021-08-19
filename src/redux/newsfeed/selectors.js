import { createSelector } from 'reselect';

export const getNewsFeedSelector = state => state.Newsfeed;

export const getNewsFeedListSelector = createSelector(
  getNewsFeedSelector,
  newsfeed => newsfeed.list
)