import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

import withTheme from 'HOCs/withTheme';
import { DEVICE_WIDTH } from 'styles/metrics';
import colors from 'styles/colors';

export const DEF_HEIGHT = 'auto';
export const DEF_WIDTH = DEVICE_WIDTH - 32;

const Card = ({
  children,
  height = DEF_HEIGHT,
  width = DEF_WIDTH,
  style: customStyles,
  stylePaper,
  ContainerComponent = TouchableOpacity,
  selfOffsetLeft = 0,
  selfOffsetTop = 0,
  ...passedProps
}) => (
  <View
    style={[
      styles.cardPaper,
      stylePaper,
      {
        width
      }
    ]}
  >
    <ContainerComponent
      activeOpacity={.7}
      style={[
        styles.card,
        {
          marginLeft: selfOffsetLeft,
          marginTop: selfOffsetTop,
          height,
          width,
        },
        customStyles,
      ]}
      {...passedProps}
    >
      {children}
    </ContainerComponent>
  </View>
);

export const cardShadowStyle = {
  overflow: 'visible',
  shadowColor: 'rgba(0, 0, 0, 0.205611)',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 2,
  borderColor: 'transparent'
};

const styles = StyleSheet.create({
  cardPaper: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'visible',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    ...cardShadowStyle,
  },
});

export default withTheme.describe({
  darkblue: props => ({
    stylePaper: {
      backgroundColor: colors._darkblue,
      ...props.stylePaper,
    },
    style: {
      backgroundColor: colors._darkblue,
      ...props.style,
    }
  }),
  grey: props => ({
    stylePaper: {
      backgroundColor: 'transparent',
      ...props.stylePaper,
    },
    style: {
      backgroundColor: '#FAFAFA',
      ...props.style,
    }
  }),
})(Card);
