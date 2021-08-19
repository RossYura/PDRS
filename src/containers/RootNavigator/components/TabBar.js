import React, { useEffect, useState, useCallback } from 'react';
import { Keyboard, Platform, TouchableOpacity, View } from 'react-native';

import TabBarIcon from './TabBarIcon';
import colors from 'styles/colors';

const TabBar = ({ routes, activeRouteIndex, navigation }) => {
  const [visible, setVisibility] = useState(true);

  const didShow = useCallback(() => {
    setVisibility(false);
  }, [visible]);

  useEffect(() => {
    //https://github.com/react-navigation/react-navigation/issues/7415
    let keyboardListeners = [];
    if (Platform.OS === 'android') {
      keyboardListeners = [
        Keyboard.addListener('keyboardDidShow', didShow),
        Keyboard.addListener('keyboardDidHide', () => setVisibility(true)),
      ];
    }

    return () => keyboardListeners.forEach((eventListener) => eventListener.remove());
  }, []);

  return visible ? (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        height: 40,
      }}
    >
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? colors._deepblue : '#C4C4C4';

        const onPress = () => {
          navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isRouteActive) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={routeIndex}
            style={{ width: 20 }}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <TabBarIcon
              tintColor={tintColor}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  ) : null;
};

export default TabBar;