import React from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';

import styles from '../styles';
import Text from 'components/common/Text';
import colors from 'styles/colors';
import { DEVICE_WIDTH } from 'styles/metrics';
import TabBar from './TabBar';

const OnBoardingTabBarContainer = ({
  navigation,
  state,
}) => {
  const { routes, index: activeRouteIndex } = state;
  const isLastStep = state.routeNames[state.index] === 'onBoarding4';

  return (
    <SafeAreaView
      style={styles.tabBarContainer}
    >
      <TabBar
        activeRouteIndex={activeRouteIndex}
        routes={routes}
        navigation={navigation}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        style={{
          height: 40,
          justifyContent: 'center',
          right: isLastStep ? DEVICE_WIDTH * 1 / 8 : DEVICE_WIDTH * 1 / 7,
          position: 'absolute',
          bottom: 0
        }}
      >
        <Text
          color={colors._darkblue}
          fontSize={12}
        >
          {isLastStep ? 'Start Chipping' : 'Skip'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnBoardingTabBarContainer;