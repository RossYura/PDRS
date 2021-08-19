import React from 'react';
import { TouchableOpacity } from 'react-native';

import withProps from 'recompose/withProps';
import colors from 'styles/colors';
import Text from 'components/common/Text';

export default withProps(props => ({
  style: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: .5,
    borderColor: '#04344A',
    padding: 0,
    height: 20,
    width: 73,
    justifyContent: 'center',
    alignItems: 'center'
  },
  children:(
    <Text
      fontSize={8}
      color={colors._darkblue}
    >
      {props.children}
    </Text>
  )
}))(TouchableOpacity);