import React from 'react';
import { SafeAreaView } from 'react-native';

import styles from '../styles';
import TabBar from './TabBar';

const TabBarContainer = ({
  navigation,
  state,
}) => {
  const { routes, index: activeRouteIndex } = state;

  return (
    <SafeAreaView
      style={styles.tabBarContainer}
    >
      <TabBar
        activeRouteIndex={activeRouteIndex}
        routes={routes}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default TabBarContainer;