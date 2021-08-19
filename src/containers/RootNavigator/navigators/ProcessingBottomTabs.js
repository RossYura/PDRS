import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  defaultBottomTabNavigatorConfig,
} from '../configs';
import ProcessingScreen from 'components/processing';
import withProps from 'recompose/withProps';
import discoveryIco from 'assets/images/discovery.svg';
import TabIcon from '../components/TabIconDiscovery';
import PreferencesStackNavigator from './PreferencesStack';
import profileIco from 'assets/images/profile.svg';

const Tab = createBottomTabNavigator();

const ProcessingBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      {...defaultBottomTabNavigatorConfig}
    >
      <Tab.Screen
        name="Processing"
        component={ProcessingScreen}
        options={{
          tabBarIcon: withProps({ icon: discoveryIco })(TabIcon)
        }}
      />
      <Tab.Screen
        name="Account"
        component={PreferencesStackNavigator}
        options={{
          tabBarIcon: withProps({ icon: profileIco })(TabIcon)
        }}
      />
    </Tab.Navigator>
  );
};

export default ProcessingBottomTabNavigator;