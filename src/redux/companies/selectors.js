import { createSelector } from 'reselect';

export const getCompaniesState = state => state.companies;

export const getCompaniesWithPendingInvestmentsCollectionState = createSelector(
  getCompaniesState,
  state => state.pendingCompanies,
);
