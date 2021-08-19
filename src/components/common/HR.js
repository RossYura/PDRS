import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from 'styles/colors';

const HR = ({style, color = colors._lightgray, space = 15, height = 1}) => (
  <View
    style={[
      styles.base,
      style,
      {
        borderBottomWidth: height,
        borderBottomColor: color,
        marginVertical: space
      }
    ]}
  />
);

const styles = StyleSheet.create({
  base: {
    width: '100%'
  },
});

export default HR;
