import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import onBoarding1Screen from 'components/onboarding/OnBoarding1';
import onBoarding2Screen from 'components/onboarding/OnBoarding2';
import onBoarding3Screen from 'components/onboarding/OnBoarding3';
import onBoarding4Screen from 'components/onboarding/OnBoarding4';
import OnBoardingTabBarContainer from '../components/OnBoardingTabBarContainer';

const Tab = createMaterialTopTabNavigator();

const OnBoardingMaterialTopTabNavigator = () => {
  return (
    <Tab.Navigator
      swipeEnabled
      tabBarPosition="bottom"
      tabBar={OnBoardingTabBarContainer}
    >
      <Tab.Screen
        name="onBoarding1"
        component={onBoarding1Screen}
      />
      <Tab.Screen
        name="onBoarding2"
        component={onBoarding2Screen}
      />
      <Tab.Screen
        name="onBoarding3"
        component={onBoarding3Screen}
      />
      <Tab.Screen
        name="onBoarding4"
        component={onBoarding4Screen}
      />
    </Tab.Navigator>
  );
};

export default OnBoardingMaterialTopTabNavigator;