import React from 'react';
import { View } from 'react-native';

import colors from 'styles/colors';

export default () => (
  <View
    style={{
      backgroundColor: colors._darkblue,
      width: 4,
      height: 4,
      borderRadius: 2
    }}
  />
);