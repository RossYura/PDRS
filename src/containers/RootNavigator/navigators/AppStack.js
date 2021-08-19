import React, { useState } from 'react';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import MainBottomTabNavigator from './MainBottomTabs';
import ProcessingBottomTabNavigator from './ProcessingBottomTabs';
import useUser from 'hooks/useUser';
import useEffectAsync from 'hooks/useEffectAsync';
import ProfileStackNavigator from './ProfileStack';
import WebViewerScreen from 'components/common/WebViewer';
import EsignBottomTabNavigator from './EsignBottomTabs';
import OnBoardingMaterialTopTabNavigator from './OnBoardingMaterialTopTabs';
import DefunctBottomTabNavigator from './DefunctBottomTabs';
import InactiveBottomTabNavigator from './InactiveBottomTabs';

const Stack = createStackNavigator();

const profileStatusScreenRelationsMap = {
  unapproved: 'Profile',
  pending: 'Processing',
  approved: 'ESign',
  live: 'Main',
  defunct: 'Defunct',
  inactive: 'Inactive',
};

const AppStackNavigator = () => {
  const [initialScreen, setInitialScreen] = useState(null);
  const user = useUser();
  const navigation = useNavigation();

  useEffectAsync(async () => {
    const { email, authenticationToken, profileStatus } = user;

    axios.defaults.headers.common['X-User-Email'] = email;
    axios.defaults.headers.common['X-User-Token'] = authenticationToken;

    const screenName = profileStatusScreenRelationsMap[profileStatus];

    if (screenName) {
      if (!initialScreen) {
        setInitialScreen(screenName);
      } else {
        navigation.navigate(screenName);
      }
    } else {
      setInitialScreen('Main');
    }

    switch (profileStatus) {
    case 'unapproved':
      setInitialScreen('Profile');
      break;
    case 'pending':
      setInitialScreen('Processing');
      break;
    case 'approved':
      setInitialScreen('ESign');
      break;
    case 'live':
      setInitialScreen('Main');
      break;
    case 'defunct':
      setInitialScreen('Defunct');
      break;
    case 'inactive':
      setInitialScreen('Inactive');
      break;
    default:
      setInitialScreen('Main');
    }
  }, [user.profileStatus]);

  if (!initialScreen)
    return null;

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={initialScreen}
    >
      <Stack.Screen
        name="Main"
        component={MainBottomTabNavigator}
      />
      <Stack.Screen
        name="Defunct"
        component={DefunctBottomTabNavigator}
      />
      <Stack.Screen
        name="Inactive"
        component={InactiveBottomTabNavigator}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoardingMaterialTopTabNavigator}
      />
      <Stack.Screen
        name="Processing"
        component={ProcessingBottomTabNavigator}
      />
      <Stack.Screen
        name="ESign"
        component={EsignBottomTabNavigator}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileStackNavigator}
      />
      <Stack.Screen
        name="WebViewer"
        component={WebViewerScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;