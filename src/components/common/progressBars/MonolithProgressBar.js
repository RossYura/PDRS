import React from 'react';
import { View } from 'react-native';
import Triangle from 'react-native-triangle';
import { LinearGradient } from 'expo-linear-gradient';

import colors from 'styles/colors';
import { DEVICE_WIDTH } from 'styles/metrics';
import GradientText from 'components/common/GradientText';

class MonolithProgressBar extends React.Component {
  render () {
    const { progress1, progress2, total, height = 3, placeholder = null, renderAnchorTip } = this.props;

    return (
      <View
        style={{
          height: height + 28,
          justifyContent: 'flex-start',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              height,
              flex: progress1,
              backgroundColor: colors._darkblue,
            }}
          />
          <LinearGradient
            colors={[
              '#431377',
              '#0082AB']}
            start={[0, 0]}
            end={[1, 0]}
            locations={[0.3, 0.7]}
            style={{
              height,
              flex: progress2,
            }}
          />
          <View
            style={{
              height,
              flex: total - progress1 - progress2,
              backgroundColor: colors._lightgray,
            }}
          />
        </View>
        {
          renderAnchorTip
            ? (
              <View
                style={{
                  position: 'absolute',
                  left: ((progress1 + progress2) / total * (DEVICE_WIDTH - 64)) - 15,
                }}
              >
                <View
                  style={{
                    marginTop: 5,
                    alignItems: 'center',
                    width: 30,
                  }}
                >
                  <Triangle
                    width={7}
                    height={5}
                    color={'#EFEFF4'}
                    direction={'up'}
                  />
                  <View
                    style={{
                      height: 13,
                      width: 32,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#EFEFF4',
                      borderRadius: 3,
                      overflow: 'visible',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 1,
                      elevation: 2,
                      borderColor: 'transparent',
                    }}
                  >
                    <GradientText
                      text={`${Math.round((progress1 + progress2) * 100 / total)} %`}
                      svgHeight={12}
                      svgWidth={30}
                      fontSize={10}
                      fontWeight='normal'
                    />
                  </View>
                </View>
              </View>
            ) : placeholder
        }
      </View>
    );
  }
}

export default MonolithProgressBar;