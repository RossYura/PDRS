import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const PentagonalButton = ({
  color, 
  textStyle, 
  height = 30, 
  label, 
  ...TouchableOpacityProps 
}) => (
  <TouchableOpacity
    {...TouchableOpacityProps}
  >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View 
        style={[
          styles.rhombus,
          {
            width: (height + 3) / Math.sqrt(2),
            height: (height + 3) / Math.sqrt(2),
          },
          color && {backgroundColor: color},
        ]}
      />
      <View
        style={[
          styles.textContainer,
          {
            height: height,          
          },
          color && {backgroundColor: color},
        ]}
      >
        <Text
          style={[
            styles.text, 
            textStyle,
          ]}
        >
          {label}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  textContainer: {
    width: 70,
    backgroundColor: '#00B9D1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'ProximaNova_Regular',
  },
  rhombus: {
    backgroundColor: '#00B9D1',
    borderRadius: 5,
    transform: ([{ rotate: '45deg'}]),
    marginRight: -15.5,
  }
});

export default PentagonalButton;