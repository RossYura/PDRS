import React from 'react';
import SvgUri from 'expo-svg-uri';
import { View } from 'react-native';

import Text from 'components/common/Text';
import Button, { buttonVariationsStyles } from 'components/common/Button';
import colors from 'styles/colors';

const DynamicButton = ({ onPress, text, icon, children, inactive = false, style }) => ( 
  <Button 
    width={220}
    dynamicHeight={true}
    onPress={onPress}
    style={[
      style,
      {
        backgroundColor: inactive 
          ? 'transparent' 
          : buttonVariationsStyles.primary.buttonDefault.backgroundColor,
        paddingHorizontal: 20,
        paddingVertical: 4,
      }
    ]}
    content={(
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <SvgUri
          source={icon}
          width={35}
          fill={inactive ? colors._gray : '#ffffff'}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            color="#ffffff"
            fontSize={15}
            textAlign="center"
          >
            {children || text}
          </Text>
        </View>
      </View>
    )}
  />
);

export default DynamicButton;