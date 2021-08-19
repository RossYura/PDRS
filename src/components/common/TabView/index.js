import React, { useState, useEffect } from 'react';
import { TabView as TabViewOrigin, SceneMap } from 'react-native-tab-view';

import { DEVICE_WIDTH } from 'styles/metrics';
import withTheme from 'HOCs/withTheme';
import TabBar from './components/TabBar';
import TabBarWhite from './components/TabBarWhite';

const TabView = ({ navState, scenesMap, TabBarComponent = TabBar, afterIndexChange }) => {

  const [_navState, setNavState] = useState(navState);

  useEffect(() => {
    afterIndexChange(_navState);
  });

  return (
    <TabViewOrigin
      renderTabBar={TabBarComponent}
      navigationState={_navState}
      renderScene={SceneMap(scenesMap)}
      onIndexChange={index => {
        setNavState({
          ..._navState,
          index,
        });
      }}
      initialLayout={{ width: DEVICE_WIDTH }}
    />
  );
};

export default withTheme.describe({
  white: (props) => ({
    TabBarComponent: TabBarWhite,
    ...props,
  }),
})(TabView);