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
import DefunctScreen from '../../../components/defunct';

const Tab = createBottomTabNavigator();

const DefunctBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      {...defaultBottomTabNavigatorConfig}
    >
      <Tab.Screen
        name="Defunct"
        component={DefunctScreen}
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

export default DefunctBottomTabNavigator;