import React from 'react';
import { View } from 'react-native';
import FlashMessage, { DefaultFlash } from 'react-native-flash-message';

import { isIphoneX } from 'utils/device';

const DefaultFlashIphoneX = (props) => (
  <View style={{ marginTop: -8 }}>
    <DefaultFlash {...props}/>
  </View>
);

const MessageComponent = isIphoneX() ? DefaultFlashIphoneX : DefaultFlash;

FlashMessage.defaultProps = {
  ...FlashMessage.defaultProps,
  MessageComponent,
};
