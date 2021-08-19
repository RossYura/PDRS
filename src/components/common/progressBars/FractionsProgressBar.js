import React from 'react';
import { View, StyleSheet } from 'react-native';

import { DEVICE_WIDTH, SCREEN_PADDING_HORIZONTAL } from 'styles/metrics';
import colors from 'styles/colors';

class FractionsProgressBar extends React.Component {

  render () {
    const {
      width = DEVICE_WIDTH - (SCREEN_PADDING_HORIZONTAL * 2),
      progress1,
      progress2,
      total,
      cellsCount = 10,
    } = this.props;

    const progress1Width = progress1 * width / total;
    const progress2Width = progress2 * width / total;

    return (
      <View
        style={[
          styles.container,
          {
            width,
          },
        ]}
      >
        <View
          style={[
            styles.mask,
            styles.primaryMask,
          ]}
        />
        <View
          style={[
            styles.mask,
            styles.progress2Mask,
            {
              right: width - progress2Width,
            },
          ]}
        />
        <View
          style={[
            styles.mask,
            styles.progress1Mask,
            {
              right: width - progress1Width,
            },
          ]}
        />
        <View
          style={[
            styles.mask,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}
        >
          {
            Array.from(new Array(cellsCount + 1))
              .map((v, i, arr) => {
                const index = i + 1;

                return (
                  <View
                    key={index}
                    style={[
                      {
                        width: 2,
                        backgroundColor: (index === 1 || index === arr.length)
                          ? 'transparent'
                          : '#ffffff',
                      },
                    ]}
                  />
                );
              })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    height: 10,
    width: '100%',
    borderRadius: 4.5,
    overflow: 'hidden',
  },
  mask: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    height: 10,
    right: 0,
  },
  primaryMask: {
    backgroundColor: colors._lightgray,
  },
  progress1Mask: {
    backgroundColor: colors._darkblue,
  },
  progress2Mask: {
    backgroundColor: colors._deepblue,
  },
});

export default FractionsProgressBar;