import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome2Screen from 'components/welcome/Welcome2';
import Welcome3Screen from 'components/welcome/Welcome3';
import SignInScreen from 'components/welcome/auth/SignIn';
import SignUpScreen from 'components/welcome/auth/SignUp';
import ForgotPasswordScreen from 'components/welcome/auth/ForgotPassword';
import AuthWelcomeScreen from 'components/welcome/auth/AuthWelcome';
import AuthWelcome2Screen from 'components/welcome/auth/AuthWelcome2';
import TabBarContainer from '../components/TabBarContainer';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const Welcome1StackNavigator = () => (
  <Stack.Navigator
    headerMode="none"
  >
    <Stack.Screen
      name="AuthWelcome"
      component={AuthWelcomeScreen}
      options={{
        header: null,
      }}
    />
    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{
        header: null,
      }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
    />
  </Stack.Navigator>
);

const Welcome4StackNavigator = () => (
  <Stack.Navigator
    headerMode="none"
  >
    <Stack.Screen
      name="AuthWelcome2"
      component={AuthWelcome2Screen}
      options={{
        header: null,
      }}
    />
    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{
        header: null,
      }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
    />
  </Stack.Navigator>
);

const WelcomeMainMaterialTopTabNavigator = () => {
  return (
    <Tab.Navigator
      swipeEnabled
      tabBarPosition="bottom"
      tabBar={TabBarContainer}
    >
      <Tab.Screen name="Welcome1" component={Welcome1StackNavigator}/>
      <Tab.Screen name="Welcome2" component={Welcome2Screen}/>
      <Tab.Screen name="Welcome3" component={Welcome3Screen}/>
      <Tab.Screen name="Welcome4" component={Welcome4StackNavigator}/>
    </Tab.Navigator>
  );
};

export default WelcomeMainMaterialTopTabNavigator;