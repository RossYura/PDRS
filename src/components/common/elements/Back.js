import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg from 'expo-svg-uri';

import backIco from 'assets/images/back.svg';

const Close = ({ onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.iconContainer,
      style
    ]}
  >
    <Svg
      width="21"
      height="21"
      source={backIco}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 15,
    width: 29,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 24, 46, 0.4)'
  },
});

export default Close;