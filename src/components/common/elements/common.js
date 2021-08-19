import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const Circle = ({ style, size, color }) => {
  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        backgroundColor: color,
        ...style,
      }}
    />
  );
};

export const HorizontalLine = ({ color, height = 1 }) => {
  return <View style={{ height, backgroundColor: color, flex: 1 }} />;
};

export const DashedHorizontalLine = ({ color, height = 1 }) => {
  return <View
    style={{
      borderColor: color,
      flex: 1,
      height: 1,
      borderTopWidth: height,
    }}
  />;
};

export let NavHeaderRight = ({ navigation, text, label, href }) => {
  if(text){
    return(
      <Text 
        style={{paddingRight: 10}}
        onPress={() => navigation.navigate(href)}
      >
        {text}
      </Text>
    );
  } else if(label) {
    return(
      <FontAwesome
        name={label}
        size={25}
        style={{ color: '#bdc3c7', paddingRight: 10 }}
        onPress={() => navigation.navigate(href)}
      />
    );
  } else {
    return null;
  }
};

export let NavHeaderBack = ({ label }) => {
  return(
    <FontAwesome
      name={label}
      size={25}
      style={{ color: '#bdc3c7', paddingLeft: 10 }}
    />
  );
};

export let NavTab = ({ label, tintColor }) => {
  return(
    <FontAwesome
      name={label}
      size={25}
      style={{ color: tintColor }}
    />
  );
};
