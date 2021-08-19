import { createSelector } from 'reselect';

export const getStartupRootSelector = state => state.Startup;

export const getStartupMatches = createSelector(
  getStartupRootSelector,
  startup => startup.matches,
);

export const getStartupSelectedMatch = createSelector(
  getStartupRootSelector,
  startup => startup.selected_match,
);

export const getStartupProspectMatches = createSelector(
  getStartupRootSelector,
  startup => startup.prospectMatches,
);

export const getProspectSwitchStatus = createSelector(
  getStartupRootSelector,
  startup => startup.prospectSwitchToggled,
);