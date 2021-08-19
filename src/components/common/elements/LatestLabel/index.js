import React from 'react';
import { View } from 'react-native';
import Svg from 'expo-svg-uri';

import latestLabelIco from 'assets/images/latest_lightning.svg';
import Space from 'components/common/Space';
import Text from 'components/common/Text';
import colors from 'styles/colors';
import withTheme from 'HOCs/withTheme';

const LatestLabel = ({ top = 24, right = 16, fill, textStyle }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top,
      right,
    }}
  >
    <Svg
      source={latestLabelIco}
      fill={fill}
    />
    <Space horizontal size={5}/>
    <Text
      fontSize={13}
      color={colors._deepblue}
      style={textStyle}
    >
      Latest
    </Text>
  </View>
);

export default withTheme.describe({
  white: props => ({
    fill: '#ffffff',
    textStyle: {
      ...props.textStyle,
      color: '#ffffff',
    },
  }),
  darkblue: props => ({
    fill: colors._darkblue,
    textStyle: {
      ...props.textStyle,
      color: colors._darkblue,
    },
  }),
})(LatestLabel);