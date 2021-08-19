import React from 'react';
import { View } from 'react-native';

const SectionGrey = ({ top, children }) => (
  <View
    style={{
      backgroundColor: top ? '#ffffff' : '#F2F6FF',
      paddingHorizontal: 10,
      height: 30,
      flexDirection: 'row',
      alignItems: 'center',
      borderTopRightRadius: top ? 10 : 0,
      borderTopLeftRadius: top ? 10 : 0,
      borderBottomRightRadius: top ? 0 : 10,
      borderBottomLeftRadius: top ? 0 : 10,
    }}
  >
    {children}
  </View>
);

export default SectionGrey;