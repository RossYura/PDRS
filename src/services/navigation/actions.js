import {
  CommonActions as _CommonActions,
  StackActions,
} from '@react-navigation/native';

import { navigator } from 'services/navigation';

export const navigate = (routeName, params) => {
  navigator.navigate(routeName, params);
};

export const goBack = () => {
  navigator.goBack();
};

//rootRouteName => one of root bottom tab navigators
export const resetUponAppRoot = rootRouteName => {
  const resetAction = StackActions.reset({
    index: 0,
    routes: [
      { name: rootRouteName },
    ],
  });

  navigator.dispatch(resetAction);
};

export const CommonActions = {
  navigate: (name, params) => navigator.dispatch(
    _CommonActions.navigate({
      name,
      params,
    }),
  ),
};