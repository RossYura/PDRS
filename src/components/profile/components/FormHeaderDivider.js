import React from 'react';
import { View } from 'react-native';

import colors from 'styles/colors';
import HR from 'components/common/HR';
import Space from 'components/common/Space';
import Text from 'components/common/Text';

const FormHeaderDivider = ({ children, fontSize = 12, HRtop = true, HRbottom = true }) => (
  <View>
    {
      HRtop ? <HR/> : <Space size={15} vertical/>
    }
    <Space size={22} horizontal/>
    <Text
      fontSize={fontSize}
      color={colors._gray}
    >
      {children}
    </Text>
    <Space size={22} horizontal/>
    {
      HRbottom ? <HR/> : <Space size={15} vertical/>
    }
  </View>
);

export default FormHeaderDivider;