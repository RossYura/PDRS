import React from 'react';
import SvgUri from 'expo-svg-uri';
import { View, StyleSheet } from 'react-native';

import Text from 'components/common/Text';
import Button, { buttonVariationsStyles } from 'components/common/Button';
import colors from 'styles/colors';

const SettingsButton = ({ onPress, text, icon, children, inactive = false, style }) => (
  <Button
    width={220}
    height={30}
    onPress={onPress}
    style={[
      styles.button,
      style,
      {
        backgroundColor: inactive ? 'transparent' : buttonVariationsStyles.primary.buttonDefault.backgroundColor,
      },
    ]}
    content={(
      <React.Fragment>
        <SvgUri
          source={icon}
          width={35}
          fill={inactive ? colors._gray : '#ffffff'}
        />
        <View
          style={styles.textContainer}
        >
          <Text
            color="#ffffff"
            fontSize={15}
          >
            {children || text}
          </Text>
        </View>
      </React.Fragment>
    )}
  />
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsButton;