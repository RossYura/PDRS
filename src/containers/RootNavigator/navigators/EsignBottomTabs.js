import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  defaultBottomTabNavigatorConfig,
} from '../configs';
import withProps from 'recompose/withProps';
import discoveryIco from 'assets/images/discovery.svg';
import TabIcon from '../components/TabIconDiscovery';
import PreferencesStackNavigator from './PreferencesStack';
import ESignScreen from 'components/esign';
import ESignRejectScreen from 'components/esign/Rejected';
import ESignConfirmScreen from 'components/esign/Confirmed';
import ForgotPasswordScreen from 'components/welcome/auth/ForgotPassword';
import profileIco from 'assets/images/profile.svg';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ESignStackNavigator = () => (
  <Stack.Navigator
    headerMode="none"
  >
    <Stack.Screen
      name="ESignMain"
      component={ESignScreen}
    />
    <Stack.Screen
      name="ESignConfirm"
      component={ESignConfirmScreen}
    />
    <Stack.Screen
      name="ESignReject"
      component={ESignRejectScreen}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
    />
  </Stack.Navigator>
);

const ProcessingBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      {...defaultBottomTabNavigatorConfig}
    >
      <Tab.Screen
        name="ESign"
        component={ESignStackNavigator}
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