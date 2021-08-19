import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Text from 'components/common/Text';
import colors from 'styles/colors';
import Space from 'components/common/Space';

const TabBar = ({ jumpTo, navigationState: { routes, index } }) => (
  <View
    style={{
      flexDirection: 'row',
      marginBottom: 24,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderColor: '#025D7B',
      overflow: 'visible'
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
              alignItems: 'center',
              flex: 1,
              overflow: 'visible'
            },
          ]}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 33,
              overflow: 'visible'
            }}
          >
            <Text
              fontSize={14}
              color="#0F496B"
            >
              {title}
            </Text>
            <Space size={6}/>
            <View
              style={{
                position: 'absolute',
                bottom: -3,
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: index === i
                  ? colors._darkviolet
                  : 'transparent',
                shadowColor: '#666666',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowRadius: 5,
              }}
            />
          </View>
        </TouchableOpacity>
      ))
    }
  </View>
);

export default TabBar;