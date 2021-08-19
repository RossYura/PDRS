import React from 'react';
import { View, StyleSheet } from 'react-native';
import humanizeDuration from 'humanize-duration';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

import Text from 'components/common/Text';
import colors from 'styles/colors';

const Duration = ({ endDate, timeIconStyle, size = 16, style, color = colors._gray }) => (
  <View
    style={[
      styles.container,
      style
    ]}
  >
    <Ionicons
      name='ios-time'
      size={size}
      style={[
        {
          marginRight: 4,
        },
        timeIconStyle,
      ]}
      color='#D8D8D8'
    />
    <Text
      fontSize={12}
      color={color}
    >
      {
        humanizeDuration(
          moment()
            .diff(moment(endDate)),
          {
            units: ['d', 'h', 'm'],
            maxDecimalPoints: 0,
            delimiter: ' ',
            spacer: '',
            language: 'shortEn',
            languages: {
              shortEn: {
                y: () => 'y',
                mo: () => 'mo',
                w: () => 'w',
                d: () => 'd',
                h: () => 'h',
                m: () => 'm',
                s: () => 's',
                ms: () => 'ms',
              },
            },
          },
        )
      }
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Duration;