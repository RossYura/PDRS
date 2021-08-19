import React from 'react';
import { StyleSheet, Switch as SwitchOrigin, View } from 'react-native';

const Switch = ({ text, containerStyles, ...SwitchProps }) => (
  <View
    style={[
      styles.container,
      containerStyles,
    ]}
  >
    <SwitchOrigin
      {...SwitchProps}
    />
    <View style={styles.textContainer}>
      {text}
    </View>
  </View>
);

export const styles = StyleSheet.create({
  container: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    marginTop: 2,
  },
});

export default Switch;
