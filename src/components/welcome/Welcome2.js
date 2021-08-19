import React from 'react';
import { Image, View , Platform} from 'react-native';
import SvgUri from 'expo-svg-uri';

import Text from 'components/common/Text';
import ScreenContainer from 'containers/ScreenContainer';
import { 
  DEVICE_HEIGHT,
  SMALL_DEVICE_ANDROID,
} from 'styles/metrics';
import rocketIco from 'assets/images/rocket.png';
import colors from 'styles/colors';
import Space from 'components/common/Space';
import headerLogoIcon from 'assets/images/header_logo.svg';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';

const GRADIENT_HEIGHT = DEVICE_HEIGHT * 2 / 3 < 500 
  && Platform.OS === 'ios' 
  ? 500 
  : DEVICE_HEIGHT * 2 / 3;

const Welcome2 = () => (
  <ScreenContainer
    backgroundHeader
    justify="space-between"
    gradientHeight={GRADIENT_HEIGHT}
    contentOffsetTop={SMALL_DEVICE_ANDROID ? 200 : 270}
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
          height: DEVICE_HEIGHT/3 + 50
        }}
        source={rocketIco}
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
        >
          Diversify your portfolio by discovering new, pre-qualified, investment opportunities every week
        </Text>
        <Space size={50}/>
      </View>
    </View>
  </ScreenContainer>
);

export default ensureAndroidCloseButton(Welcome2);