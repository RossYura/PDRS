import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';

import Text from 'components/common/Text';

const Anchor = ({ href, children, ...TextProps }) => {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(href)}
    >
      <Text
        {...TextProps}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Anchor;