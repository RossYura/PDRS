import { createRef } from 'react';

import * as navigatorActions from './actions';
import * as deepLinks from './deepLinks';

export const navigatorRef = createRef();

export let navigator;

//used for navigator remote ref initialize after NavigationContainer mount
export const setupNavigatorExport = () => {
  navigator = navigatorRef?.current;
  NavigationService.navigator = navigatorRef?.current;
};

const NavigationService = {
  navigatorRef,
  navigator,
  setupNavigatorExport,
  ...navigatorActions,
  deepLinks,
};

export default NavigationService;