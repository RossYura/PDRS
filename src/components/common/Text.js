import React from 'react';
import { Text as TextOrigin, StyleSheet } from 'react-native';

import colors from 'styles/colors';
import { styleNames } from 'utils/ui';

const Text = ({
  bold = false,
  children,
  fontSize = styles.text.fontSize,
  textAlign = 'auto',
  color = styles.text.color,
  style: customStyle,
  fontFamily = styles.text.fontFamily,
  lineHeight,
  ...TextProps
}) => (
  <TextOrigin
    style={[
      styles.text,
      {
        fontSize,
        color,
        textAlign,
        fontFamily,
      },
      ...styleNames(
        {
          condition: lineHeight,
          style: { lineHeight }
        },
        {
          condition: bold,
          style: { fontFamily: 'ProximaNova_Bold'}
        },
      ),
      customStyle,
    ]}
    {...TextProps}
  >
    {children}
  </TextOrigin>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors._gray,
    fontFamily: 'ProximaNova_Regular',
  },
});

export default Text;