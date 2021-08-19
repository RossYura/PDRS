import React from 'react';
import { View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import NewsfeedCard from './NewsfeedCardGeneric';
import Space from 'components/common/Space';
import Text from 'components/common/Text';
import Logo from './Logo';

const FullViewCard = ({ updateEvent, detailsRoute }) => {
  const navigation = useNavigation();

  return (
    <NewsfeedCard
      onPress={() => navigation.navigate(
        detailsRoute,
        { updateEvent },
      )}
      height={185}
      style={{
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }}
    >
      <ImageBackground
        source={{uri: updateEvent.image}}
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 11,
          resizeMode: 'cover',
          borderRadius: 20,
          marginHorizontal: -5,
          justifyContent: 'flex-end'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Logo big updateEvent={updateEvent}/>
          <Space size={14} horizontal/>
          <View
            style={{
              flex: 1
            }}
          >
            <Text
              bold
              fontSize={24}
              color="#ffffff"
            >
              {updateEvent.title}
            </Text>
            <Space size={3}/>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}
            >
              {
                updateEvent.company && (
                  <Text
                    bold
                    fontSize={14}
                    color="#ffffff"
                  >
                    {updateEvent.company.name}
                  </Text>
                )
              }
              <Text
                fontSize={12}
                color="#ffffff"
              >
                {`${updateEvent.timeAge} ago`}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </NewsfeedCard>
  );
};

export default FullViewCard;