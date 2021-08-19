import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PreferencesMainScreen from 'components/preferences';
import PreferencesPasswordScreen from 'components/preferences/password';
import PreferencesDetailsScreen from 'components/preferences/details';
import PreferencesLegalEntitiesScreen from 'components/preferences/legalEntities';

const Stack = createStackNavigator();

const PreferencesStackNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="none"
    >
      <Stack.Screen
        name="PreferencesMain"
        component={PreferencesMainScreen}
      />
      <Stack.Screen
        name="PreferencesPassword"
        component={PreferencesPasswordScreen}
      />
      <Stack.Screen
        name="PreferencesDetails"
        component={PreferencesDetailsScreen}
      />
      <Stack.Screen
        name="PreferencesLegalEntities"
        component={PreferencesLegalEntitiesScreen}
      />
    </Stack.Navigator>
  );
};

export default PreferencesStackNavigator;