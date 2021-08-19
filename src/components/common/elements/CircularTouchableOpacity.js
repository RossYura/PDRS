import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg from 'expo-svg-uri';

const CircularElement = ({ source, svgStyles, onPress, style, width, height }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.iconContainer,
      style
    ]}
  >
    <Svg
      width={width}
      height={height}
      source={source}
      style={svgStyles}
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

export default CircularElement;