import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SegmentedControls as SegmentedControlsOrigin } from 'react-native-radio-buttons';

import colors from 'styles/colors';
import { styleNames } from 'utils/ui';

const SegmentedControls = ({ optionHeight = 50, ...SegmentedControlsProps }) => (
  <SegmentedControlsOrigin
    direction="row"
    renderOption={(option, selected) => (
      <Text
        style={[
          styles.segmentedControlOption,
          styleNames({
            style: {
              color: '#ffffff',
            },
            condition: selected
          }),
        ]}
      >
        {option.label}
      </Text>
    )}
    extractText={option => option.label}
    optionContainerStyle={[
      styles.segmentedControlOptionContainer,
      { height: optionHeight },
    ]}
    containerStyle={styles.segmentedControlContainer}
    separatorTint={colors.semiTransparentGreen}
    selectedBackgroundColor={'#00B9D1'}
    testOptionEqual={(selectedValue, option) => selectedValue ===
      option.value}
    {...SegmentedControlsProps}
  />
);

export const styles = StyleSheet.create({
  segmentedControlOptionContainer: {
    borderColor: colors.semiTransparentGreen,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 25,
  },
  segmentedControlContainer: {
    borderRadius: 30,
    borderColor: colors._blue,
  },
  segmentedControlOption: {
    fontSize: 14,
    fontFamily: 'ProximaNova_Regular',
    color: '#00B9D1',
    lineHeight: 20,
  },
});

export default SegmentedControls;
