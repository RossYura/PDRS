import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChipInAmountDialog from 'components/common/modals/ChipIn/ChipInAmountDialog';
import ChipInConfirmDialog from 'components/common/modals/ChipIn/ChipInConfirmDialog';

const Stack = createStackNavigator();

const ModalsStackNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
    >
      <Stack.Screen
        name="ChipInAmount"
        component={ChipInAmountDialog}
      />
      <Stack.Screen
        name="ChipInConfirm"
        component={ChipInConfirmDialog}
      />
    </Stack.Navigator>
  );
};

export default ModalsStackNavigator;