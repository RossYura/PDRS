import React, { useState, useCallback, useEffect } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import SvgUri from 'expo-svg-uri';

import usePrevious from 'hooks/usePrevious';
import { styleNames } from 'utils/ui';
import { conditionalSwitch } from 'utils/common';

const OFFSET_ACTIVE = 29;
const OFFSET_INACTIVE = 0;

const TOGGLE_DURATION = 300;

const SwitchCustom = ({ value, iconActive, iconInactive, IconInactive, onSwitch }) => {
  const [toggled, setInnerValue] = useState(value);
  const [offset, setOffset] = useState(
    new Animated.Value(toggled
      ? OFFSET_ACTIVE
      : OFFSET_INACTIVE,
    ));
  const prevValue = usePrevious(value);

  const toggleSwitch = useCallback(() => {
    Animated.timing(
      offset,
      {
        toValue: offset._value === OFFSET_INACTIVE
          ? OFFSET_ACTIVE
          : OFFSET_INACTIVE,
        duration: TOGGLE_DURATION,
      },
    )
      .start(
        () => {
          setOffset(new Animated.Value(offset._value === OFFSET_INACTIVE
            ? OFFSET_INACTIVE
            : OFFSET_ACTIVE));
          setInnerValue(!toggled);
          onSwitch && onSwitch(toggled);
        },
      );
  }, [toggled]);

  useEffect(() => {
    if (Boolean(value) !== Boolean(prevValue)) {
      setOffset(new Animated.Value(value ? OFFSET_ACTIVE : OFFSET_INACTIVE));
      setInnerValue(value);
    }
  }, [value]);

  return (
    <TouchableOpacity
      style={{
        width: 68,
        height: 26,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 15,
        overflow: 'visible',
      }}
      onPress={toggleSwitch}
    >
      <Animated.View
        style={{
          height: 26,
          left: offset,
          width: 38,
          position: 'absolute',
          zIndex: 1,
          borderRadius: 15,
          top: -1,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {
          iconActive && (
            <SvgUri
              source={iconActive(toggled).source}
              {...iconActive(toggled).props}
            />
          )
        }
      </Animated.View>
      {
        conditionalSwitch(
          {
            condition: IconInactive,
            result: IconInactive ? (
              <IconInactive
                toggled={toggled}
              />
            ) : null,
          },
          {
            condition: iconInactive,
            result: iconInactive ? (
              <SvgUri
                source={iconInactive(toggled).source}
                style={[
                  {
                    top: 7,
                    position: 'absolute',
                  },
                  styleNames(
                    {
                      condition: toggled,
                      style: {
                        left: 8,
                      },
                    },
                    {
                      condition: !toggled,
                      style: {
                        right: 8,
                      },
                    },
                  ),
                ]}
                {...iconInactive(toggled).props}
              />
            ) : null,
          },
          {
            condition: conditionalSwitch.CONDITIONS.DEFAULT,
            result: null,
          },
        )
      }
    </TouchableOpacity>
  );
};

export default SwitchCustom;