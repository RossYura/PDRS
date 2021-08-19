import React from 'react';
import { Image, View } from 'react-native';

import colors from 'styles/colors';
import welcomeSplash from 'assets/images/welcome_splash.png';
import { DEVICE_WIDTH } from 'styles/metrics';

export class WelcomeSplash extends React.Component {

  static FADE_OUT_TIMEOUT = 500

  render () {
    return (
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
          left: 0
        }}
      >
        <Image
          source={welcomeSplash}
          resizeMode='cover'
          style={{
            flex: 1,
            width: DEVICE_WIDTH,
          }}
        />
      </View>
    );
  }
}

export default WelcomeSplash;