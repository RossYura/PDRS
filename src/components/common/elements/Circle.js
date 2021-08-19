import React from 'react';
import { StyleSheet, View } from 'react-native';

import { styleNames } from 'utils/ui';

const Circle = ({ color }) => (
  <View
    style={
      styleNames({
        style: {
          width: 24,
          height: 24,
          borderRadius: 24/2,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        },
        condition: color === '#ffffff'
      })
    }
  >
    <View
      style={[
        styles.circleContainer,
        {
          borderColor: color,
          borderRadius: 10,
        },
      ]}
    >
      <View
        style={[
          styles.circleInner,
          {
            backgroundColor: color,
            borderRadius: 2,
          },
        ]}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  circleContainer: {
    borderWidth: 2,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  circleInner: {
    width: 4,
    height: 4,
  },
});

export default Circle;