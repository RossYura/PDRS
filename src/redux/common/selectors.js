import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

export const getCommonState = state => state.common;

export const getLoaders = createSelector(
  getCommonState,
  state => state.loaders,
);

export const getModalParamsByName = createSelector(
  getCommonState,
  state => modalName => state.modals[modalName] || { visible: false },
);

export const getLoaderStatusByKey = createSelector(
  getLoaders,
  loaders => memoize(key => loaders[key]),
);