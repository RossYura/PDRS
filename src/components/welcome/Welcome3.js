import React from 'react';
import { Image, View, Platform } from 'react-native';
import SvgUri from 'expo-svg-uri';

import Text from 'components/common/Text';
import ScreenContainer from 'containers/ScreenContainer';
import { 
  DEVICE_HEIGHT, 
  DEVICE_WIDTH,
  SMALL_DEVICE_ANDROID,
} from 'styles/metrics';
import Space from 'components/common/Space';
import headerLogoIcon from 'assets/images/header_logo.svg';
import colors from 'styles/colors';
import welcomeIco2 from 'assets/images/welcome_2.png';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';

const GRADIENT_HEIGHT = DEVICE_HEIGHT * 2 / 3 < 500 
  && Platform.OS === 'ios' 
  ? 500 
  : DEVICE_HEIGHT * 2 / 3;

const Welcome3 = () => (
  <ScreenContainer
    justify="space-between"
    gradientHeight={GRADIENT_HEIGHT}
    contentOffsetTop={SMALL_DEVICE_ANDROID ? 90 : DEVICE_HEIGHT / 4}
    paddingHorizontal={0}
    header={
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <SvgUri source={headerLogoIcon}/>
        <Space size={20}/>
        <Text
          fontSize={22}
          color="#ffffff"
        >
          PITCHDRIVE
        </Text>
      </View>
    }
  >
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between'
      }}
    >
      <Image
        style={{
          width: DEVICE_WIDTH+50,
          marginRight: -30
        }}
        source={welcomeIco2}
        resizeMode='contain'
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <Text
          fontSize={17}
          color={colors._darkviolet}
          textAlign="center"
          style={{
            marginTop: -150
          }}
        >
          Keep track of your startup-portfolio with real-time data and monthly investor updates
        </Text>
        <Space size={40}/>
      </View>
    </View>
  </ScreenContainer>
);

export default ensureAndroidCloseButton(Welcome3);