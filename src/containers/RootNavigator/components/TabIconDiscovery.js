import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg from 'expo-svg-uri';

import colors from 'styles/colors';

const TabIcon = ({ color, focused, icon }) => (
  <View
    style={[
      styles.container,
      {
        backgroundColor: focused ? colors._deepblue : '#ffffff',
      },
    ]}
  >
    <Svg
      width={24}
      height={24}
      source={icon}
      fill={color}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabIcon;