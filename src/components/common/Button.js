import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import { getLoaderStatusByKey } from 'redux/common/selectors';
import colors from 'styles/colors';
import { cardShadowStyle } from 'components/common/Card';

const Button = ({
  loading,
  loaderColor = colors._darkviolet,
  content,
  text,
  children,
  disabled,
  style,
  width,
  height = 64,
  dynamicHeight,
  borderRadius = 28,
  customTextStyles,
  marginVertical,
  type = 'primary',
  ...TouchableOpacityProps
}) => {
  const buttonStyles = buttonVariationsStyles[type];
  const textStyle = disabled
    ? buttonStyles.buttonDisabledText
    : buttonStyles.buttonText;
  const containerStyle = disabled
    ? buttonStyles.buttonDisabled
    : buttonStyles.buttonDefault;

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        containerStyle,
        marginVertical && styles.marginVertical,
        !dynamicHeight && { height },
        {
          width,
          borderRadius,
        },
        style,
      ]}
      {...TouchableOpacityProps}
    >
      {
        loading
          ? (
            <ActivityIndicator color={loaderColor}/>
          )
          : content || (
            <Text
              style={[
                textStyle,
                customTextStyles,
              ]}
            >
              {text || children}
            </Text>
          )
      }
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginVertical: 0,
    overflow: 'hidden',
  },
});

export const buttonVariationsStyles = {
  primary: StyleSheet.create({
    buttonDefault: {
      backgroundColor: colors._darkblue,
    },
    buttonDisabled: {
      backgroundColor: colors.lightgray,
    },
    buttonText: {
      color: '#ffffff',
    },
    buttonDisabledText: {
      color: '#ffffff',
    },
  }),
  secondary: StyleSheet.create({
    buttonDefault: {
      backgroundColor: '#ffffff',
      ...cardShadowStyle,
    },
    buttonDisabled: {
      backgroundColor: colors.lightgray,
    },
    buttonText: {
      color: colors._darkviolet,
    },
    buttonDisabledText: {
      color: colors._darkviolet,
    },
  }),
  secondaryBordered: {
    buttonDefault: {
      backgroundColor: '#ffffff',
      borderColor: '#104F74',
      borderWidth: 1,
    },
    buttonDisabled: {
      backgroundColor: colors.lightgray,
    },
    buttonText: {
      color: colors._darkviolet,
    },
    buttonDisabledText: {
      color: colors._darkviolet,
    },
  },
};

const mapStateToProps = (state, props) => ({
  loading: props.loading || getLoaderStatusByKey(state)(props.loaderKey),
});

export default connect(
  mapStateToProps,
)(Button);
