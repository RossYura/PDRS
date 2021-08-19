import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Amplitude from 'expo-analytics-amplitude';

import { sleep } from 'utils/async';
import { navigatorRef, setupNavigatorExport } from 'services/navigation';
import AppStackNavigator from './navigators/AppStack';
import ModalsStackNavigator from './navigators/ModalsStack';
import { WelcomeSplash } from 'components/welcome/WelcomeSplash';
import useUser from 'hooks/useUser';
import WelcomeMainMaterialTopTabNavigator
  from './navigators/WelcomeMainMaterialTopTabs';
import useEffectAsync from 'hooks/useEffectAsync';
import {
  AMP_TAB_PRESSED,
  AMP_NEWSFEED_CARD_TAP,
  AMP_PORTFOLIO_SHOW_TAP,
} from 'static/constants/amplitudeEventTypes';

const Stack = createStackNavigator();

export const getActiveRouteName = state => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

const performRouteAnalytic = (routeName) => {
  if (routeName === 'StartupIndex') {
    Amplitude.logEvent(AMP_TAB_PRESSED + routeName.toUpperCase());
    return;
  }

  if (routeName === 'PortfolioIndex') {
    Amplitude.logEvent(AMP_TAB_PRESSED + routeName.toUpperCase());
    return;
  }

  if (routeName === 'NewsfeedIndex') {
    Amplitude.logEvent(AMP_TAB_PRESSED + routeName.toUpperCase());
    return;
  }

  if (routeName === 'PreferencesMain') {
    Amplitude.logEvent(AMP_TAB_PRESSED + routeName.toUpperCase());
    return;
  }

  if (routeName === 'PortfolioShow') {
    Amplitude.logEvent(AMP_PORTFOLIO_SHOW_TAP);
    return;
  }

  if (routeName.includes('NewsfeedDetails')) {
    Amplitude.logEvent(
      AMP_NEWSFEED_CARD_TAP
      +
      routeName
        .replace('NewsfeedDetails', '')
        .toUpperCase(),
    );
  }
};

const RootNavigator = () => {
  const [isReady, setIsReady] = React.useState(false);
  const user = useUser();
  const routeNameRef = useRef();

  useEffectAsync(async () => {
    await sleep(WelcomeSplash.FADE_OUT_TIMEOUT);

    setIsReady(true);
    setupNavigatorExport();
  }, []);

  useEffect(() => {
    const state = navigatorRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  return (
    <NavigationContainer
      ref={navigatorRef}
      onStateChange={state => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);

        if (previousRouteName !== currentRouteName) {
          performRouteAnalytic(currentRouteName);
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator
        headerMode="none"
      >
        {
          (!isReady || user === null) && (
            <Stack.Screen
              name="Splash"
              component={WelcomeSplash}
            />
          )
        }
        {
          user?.authenticationToken
            ? (
              <Stack.Screen
                name="App"
                component={AppStackNavigator}
              />
            )
            : (
              <Stack.Screen
                name="Auth"
                component={WelcomeMainMaterialTopTabNavigator}
              />
            )
        }
        <Stack.Screen
          name="Modals"
          component={ModalsStackNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
