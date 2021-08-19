import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Linking  from 'expo-linking';

import {
  defaultBottomTabNavigatorConfig,
} from '../configs';
import withProps from 'recompose/withProps';
import discoveryIco from 'assets/images/discovery.svg';
import TabIcon from '../components/TabIconDiscovery';
import StartUpStackNavigator from './StartUpStack';
import PreferencesStackNavigator from './PreferencesStack';
import profileIco from 'assets/images/profile.svg';
import newsfeedIco from 'assets/images/newsfeed.svg';
import NewsfeedStackNavigator from './NewsfeedStack';
import investmentsIco from 'assets/images/investments.svg';
import PortfolioStackNavigator from './PortfolioStack';
import useEffectAsync from 'hooks/useEffectAsync';
import NavigationService from 'services/navigation';

const Tab = createBottomTabNavigator();

const MainBottomTabNavigator = () => {

  useEffectAsync(async () => {
    Linking.addEventListener('url', ({ url: deepLinkUrl }) => {
      NavigationService.deepLinks.handle(deepLinkUrl);
    });
    const deepLinkUrl = await Linking.getInitialURL();
    NavigationService.deepLinks.handle(deepLinkUrl);
  }, []);

  return (
    <Tab.Navigator
      {...defaultBottomTabNavigatorConfig}
    >
      <Tab.Screen
        name="Startups"
        component={StartUpStackNavigator}
        options={{
          tabBarIcon: withProps({ icon: discoveryIco })(TabIcon),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Newsfeed"
        component={NewsfeedStackNavigator}
        options={{
          tabBarIcon: withProps({ icon: newsfeedIco })(TabIcon),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioStackNavigator}
        options={{
          tabBarIcon: withProps({ icon: investmentsIco })(TabIcon),
        }}
      />
      <Tab.Screen
        name="Account"
        component={PreferencesStackNavigator}
        options={{
          tabBarIcon: withProps({ icon: profileIco })(TabIcon),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;