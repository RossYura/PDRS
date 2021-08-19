import React from 'react';
import { View } from 'react-native';

import Text from 'components/common/Text';
import Logo from './Logo.js';
import Space from 'components/common/Space';
import TimeAgeLabel from './TimeAgeLabel';

const Title = ({updateEvent, company }) => company && company.name && company.companyLogo 
  ? (
    <View
      style={{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
      }}
    >
      <View 
        style={{
          flex: 0.2,
        }}
      >
        <Logo updateEvent={updateEvent} big/>
      </View>
      <View 
        style={{
          flex: 0.8,
        }}
      >
        <Text
          fontSize={24}
          color={'#ffffff'}
          numberOfLines={2}
          ellipsizeMode={'tail'}
        >
          {`${updateEvent.title}`}
        </Text>
        <Space size={10}/>
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View 
            style={{
              flex: 0.6,
            }}
          >
            <Text
              fontSize={14}
              color={'#ffffff'}
            >
              {company.name}  
            </Text>
          </View>
          <TimeAgeLabel distance={updateEvent.liveAt} withImage />
        </View>
      </View> 
    </View>
  ) : (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      <View 
        style={{
          flex: 1,
        }}
      >
        <Text
          fontSize={24}
          color={'#ffffff'}
          numberOfLines={2}
          ellipsizeMode={'tail'}
        >
          {`${updateEvent.title}`}
        </Text>
      </View>
      <TimeAgeLabel distance={updateEvent.liveAt} withImage />
    </View>
  );

export default Title;