import React from 'react';
import { 
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Text from 'components/common/Text';
import colors from 'styles/colors';

const NavLink = ({ to, params, children, style: customStyle, simpleText, ...props }) => {
  const navigation = useNavigation();

  return (
    simpleText 
      ? <Text
        fontSize={14}
        color={colors._deepblue}
        style={customStyle}
        onPress={() => navigation.navigate(to, params)}
        {...props}
      >
        {children}
      </Text>
      : <TouchableOpacity
        onPress={() => navigation.navigate(to, params)}
      >
        <Text
          fontSize={14}
          color={colors._deepblue}
          style={customStyle}
          {...props}
        >
          {children}
        </Text>
      </TouchableOpacity>
  );
};

export default NavLink;
