import React from 'react';
import { TextInput as TextInputOrigin, StyleSheet } from 'react-native';

import colors from 'styles/colors';
import withInputLabelContainer from 'containers/InputLabelContainer';

const TextInput = ({
  style,
  borderColor = '#C3D1DD',
  ...TextInputProps
}) => (
  <TextInputOrigin
    style={[
      styles.input,
      {
        borderColor,
      },
      style,
    ]}
    autoCorrect={false}
    returnKeyType="next"
    {...TextInputProps}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderTopWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    borderWidth: 1,
    paddingBottom: 10,
    fontSize: 15,
    color: colors._darkblue,
    fontFamily: 'ProximaNova_Regular',
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
});

export default withInputLabelContainer(TextInput);
