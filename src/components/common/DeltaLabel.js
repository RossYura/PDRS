import React from 'react';
import { View } from 'react-native';
import Svg from 'expo-svg-uri';

import Text from 'components/common/Text';
import StatsUpIcon from 'assets/images/stats_up.svg';
import colors from 'styles/colors';
import Space from 'components/common/Space';

const DeltaLabel = ({ comparable, comparator = 100, style, textStyle }) => +comparable
  ? (
    <View
      style={[
        {
          flexDirection: 'row',
        },
        style,
      ]}
    >
      <Text
        fontSize={12}
        style={textStyle}
      >
        {`${Math.abs(comparable - comparator).toFixed(1)}%`}
      </Text>
      <Space horizontal size={5}/>
      <Svg
        width="8"
        height="7"
        source={StatsUpIcon}
        fill={comparable === comparator
          ? colors.lightgray
          : colors._blue}
        style={{
          width: 8,
          height: 7,
          marginRight: 5,
          marginTop: 5,
          ...comparable < comparator
            ? {
              transform: ([{ rotateX: '180deg' }]),
            }
            : {},
        }}
      />
    </View>
  )
  : (
    <View
      style={[
        {
          flexDirection: 'row',
        },
        style
      ]}
    >
      <Text fontSize={12} style={textStyle}>
        0%
      </Text>
      <View
        style={{
          backgroundColor: colors._gray,
          marginLeft: 3,
          width: 6,
          height: 6,
          borderRadius: 3,
          marginRight: 5,
          marginTop: (textStyle && textStyle.fontSize) ? textStyle.fontSize/2 : 5,
        }}
      />
    </View>
  );

export default DeltaLabel;