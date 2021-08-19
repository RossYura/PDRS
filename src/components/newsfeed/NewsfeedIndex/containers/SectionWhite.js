import React from 'react';
import { View } from 'react-native';

const SectionWhite = ({ children, image }) => (
  <View
    style={[{
      backgroundColor: '#ffffff',
      flex: 1,
      borderRadius: 10,
    },
    !image && {
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 15,
      borderColor: '#F2F6FF',
      borderWidth: 1,
      borderBottomWidth: 0,
    }]}
  >
    {children}
  </View>
);

export default SectionWhite;