import React from 'react';
import { View } from 'react-native';

import styles from '../styles';

const TabBarIcon = ({ tintColor }) => (
  <View
    style={[
      styles.tabBarIcon,
      {
        backgroundColor: tintColor,
      },
    ]}
  />
);

export default TabBarIcon;