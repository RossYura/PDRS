import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  defaultBottomTabNavigatorConfig,
} from '../configs';
import withProps from 'recompose/withProps';
import discoveryIco from 'assets/images/discovery.svg';
import TabIcon from '../components/TabIconDiscovery';
import PreferencesStackNavigator from './PreferencesStack';
import profileIco from 'assets/images/profile.svg';
import InactiveScreen from 'components/inactive';

const Tab = createBottomTabNavigator();

const InactiveBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      {...defaultBottomTabNavigatorConfig}
    >
      <Tab.Screen
        name="Defunct"
        component={InactiveScreen}
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

export default InactiveBottomTabNavigator;