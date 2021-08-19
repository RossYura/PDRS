import React from 'react';
import { View, StyleSheet } from 'react-native';

const InnerShadowContainer = ({
  children,
  containerStyles,
}) => {

  return (
    <View 
      style={[
        containerStyles,
        styles.container,
      ]}
    >
      <View
        style={[
          {
            height: containerStyles.height - 4,
            width: containerStyles.width - 4,
            borderRadius: containerStyles.borderRadius - 2,            
          },
          styles.shadowContainer,
          styles.shadow,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#e6e6e6',
    overflow: 'hidden',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  shadowContainer: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    borderColor: 'transparent',
  }
});

export default InnerShadowContainer;