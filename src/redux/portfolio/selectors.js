import { createSelector } from 'reselect';

export const getPortfolioSelector = state => state.Portfolio.portfolio;
export const getCompanyUpdateLogs = state => state.Portfolio.companyUpdateLogs;
export const getActiveSections = state => state.Portfolio.activeSections;
export const getCompanyNewsFeedSelector = state => state.Portfolio.companyNewsfeed;

export const getCompanyUpdateLogsWithSortedUpdates = createSelector(
  getCompanyUpdateLogs,
  portfolio => ({
    ...portfolio,
    company: {
      ...portfolio.company,
      investorUpdates: portfolio.company.investorUpdates.sort((a, b) => new Date(a.month) - new Date(b.month))
    },
  }),
);
