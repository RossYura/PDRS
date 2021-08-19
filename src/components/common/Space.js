import React from 'react';
import { View } from 'react-native';

const Space = ({ horizontal = false, size }) => (
  <View
    style={{
      [horizontal ? 'width' : 'height']: size,
    }}
  />
);

export default Space;