import React from 'react';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

import buildInfo from 'root/buildInfo.json';
import Text from 'components/common/Text';

const AppVersion = ({ style }) => (
  <Text
    fontSize={10}
    style={style}
  >
    {`${Platform === 'ios' ? Constants.nativeAppVersion : Constants.manifest.version} / ${buildInfo.jsBuildVersion}`}
  </Text>
);

export default AppVersion;