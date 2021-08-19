import React from 'react';
import { Image, View } from 'react-native';

import colors from 'styles/colors';
import onBoarding1Splash from 'assets/images/onboarding2.png';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from 'styles/metrics';
import Text from 'components/common/Text';
import { conditionalSwitch } from 'utils/common';
import deviceGeometry from 'static/constants/deviceGeometry';

const OnBoarding2 = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors._blue,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }}
  >
    <Image
      source={onBoarding1Splash}
      style={{
        flex: 1,
        width: DEVICE_WIDTH,
      }}
    />
    {
      conditionalSwitch(
        {
          condition: DEVICE_HEIGHT < deviceGeometry.ios.iPhoneX.heightUiKit,
          result: (
            <Text
              bold
              textAlign="center"
              color={colors._darkblue}
              fontSize={20}
              style={{
                position: 'absolute',
                bottom: DEVICE_HEIGHT * 0.06,
              }}
            >
              Personalised intel and insights curated for your investments
            </Text>
          ),
        },
        {
          condition: conditionalSwitch.CONDITIONS.DEFAULT,
          result: (
            <Text
              bold
              textAlign="center"
              color={colors._darkblue}
              fontSize={24}
              style={{
                position: 'absolute',
                bottom: DEVICE_HEIGHT * 0.10,
                width: 270
              }}
            >
              Personalised intel and insights curated for your investments
            </Text>
          )
        }
      )
    }
  </View>
);

export default OnBoarding2;