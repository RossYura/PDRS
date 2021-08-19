import React from 'react';
import { View } from 'react-native';
import SvgUri from 'expo-svg-uri';
import Triangle from 'react-native-triangle';
import { useNavigation } from '@react-navigation/native';

import NewsfeedCard from '../NewsfeedCardGeneric';
import Space from 'components/common/Space';
import Text from 'components/common/Text';
import colors from 'styles/colors';
import SectionWhite from '../../containers/SectionWhite';
import SectionGrey from '../../containers/SectionGrey';
import tractionIcon from 'assets/images/traction.svg';
import TimeAgeLabel from '../TimeAgeLabel';
import Logo from '../Logo';

const TractionCard = ({ updateEvent, detailsRoute }) => {
  const navigation = useNavigation();

  return (
    <NewsfeedCard
      onPress={() => navigation.navigate(
        detailsRoute,
        { updateEvent },
      )}
    >
      <View
        style={{
          height: 130,
        }}
      >
        <SectionWhite>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Logo updateEvent={updateEvent}/>
            <Space horizontal size={7}/>
            <Text
              bold
              fontSize={13}
              color={colors._darkblue}
            >
              {
                updateEvent.company
                  ? `${updateEvent.company.name} - New Partnership`
                  : 'New Partnership'
              }
            </Text>
          </View>
          <Space size={15}/>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <Logo big updateEvent={updateEvent}/>
            <Space horizontal size={16}/>
            <View
              style={{
                shadowColor: 'rgba(0, 0, 0, 0.15)',
                shadowOffset: {
                  width: 3,
                  height: 4,
                },
                shadowOpacity: 1,
                shadowRadius: 15,
                padding: 9,
                backgroundColor: '#ffffff',
                flex: 1,
                borderRadius: 10
              }}
            >
              <Triangle
                width={18}
                height={13}
                color="#ffffff"
                direction="left"
                style={{
                  position: 'absolute',
                  top: 7,
                  left: -10
                }}
              />
              <Text
                fontSize={13}
                color={colors._darkblue}
              >
                {updateEvent.title}
              </Text>
            </View>
            <Space size={10}/>
          </View>
        </SectionWhite>
        <SectionGrey>
          <SvgUri
            source={tractionIcon}
            style={{
              position: 'absolute',
              left: 11,
              bottom: 9,
            }}
          />
          <TimeAgeLabel distance={updateEvent.liveAt} />
        </SectionGrey>
      </View>
    </NewsfeedCard>
  );
};

export default TractionCard;