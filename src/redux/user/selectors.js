import { createSelector } from 'reselect';

export const getUserReducer = state => state.User;

export const getCurrentUser = createSelector(
  getUserReducer,
  state => state.current_user,
);

export const loading = state => state.User.loading;