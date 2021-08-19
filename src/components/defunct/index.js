import React from 'react';
import { Image, View } from 'react-native';
import SvgUri from 'expo-svg-uri';

import Text from 'components/common/Text';
import ScreenContainer from 'containers/ScreenContainer';
import {
  DEVICE_HEIGHT, DEVICE_WIDTH,
} from 'styles/metrics';
import Space from 'components/common/Space';
import headerLogoIcon from 'assets/images/header_logo.svg';
import baloonsImage from 'assets/images/baloons.png';

const GRADIENT_HEIGHT = DEVICE_HEIGHT / 2 < 460
  ? 460
  : DEVICE_HEIGHT / 2;

const DefunctScreen = () => (
  <ScreenContainer
    backgroundHeader
    gradientHeight={GRADIENT_HEIGHT}
    contentOffsetTop={340}
    align="center"
    header={
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: 30,
        }}
      >
        <SvgUri source={headerLogoIcon}/>
        <Space size={18}/>
        <Text
          fontSize={22}
          color="#ffffff"
        >
          PITCHDRIVE
        </Text>
        <Space size={18}/>
        <Text
          fontSize={14}
          color="#ffffff"
          textAlign="center"
        >
          It’s not you, it’s us. We have to go our separate ways as your
          application to be a Pitchdrive investor has not been approved. We’d
          love to keep you in the community, so stay tuned for upcoming events
          and let’s have a chat!
        </Text>
      </View>
    }
  >
    <Image
      style={{
        width: DEVICE_WIDTH - 100,
        flex: 1,
        marginRight: 20,
      }}
      source={baloonsImage}
      resizeMode='contain'
    />
  </ScreenContainer>
);

export default DefunctScreen;