import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Text from 'components/common/Text';
import Space from 'components/common/Space';

const TabBarWhite = ({ jumpTo, navigationState: { routes, index } }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 24,
    }}
  >
    {
      routes.map(({ key, title }, i) => (
        <TouchableOpacity
          key={key}
          onPress={() => jumpTo(key)}
          style={[
            {
              paddingHorizontal: 10,
              alignItems: 'center'
            },
          ]}
        >
          <Text
            fontSize={14}
            color="#ffffff"
            fontWeight={600}
          >
            {title}
          </Text>
          <Space size={6}/>
          <View
            style={{
              width: 33,
              height: 2,
              backgroundColor: index === i
                ? '#ffffff'
                : 'transparent',
            }}
          />
        </TouchableOpacity>
      ))
    }
  </View>
);


export default TabBarWhite;