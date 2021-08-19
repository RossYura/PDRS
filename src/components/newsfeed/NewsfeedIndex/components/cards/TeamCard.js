import React from 'react';
import { Image, View } from 'react-native';
import SvgUri from 'expo-svg-uri';
import Triangle from 'react-native-triangle';
import { useNavigation } from '@react-navigation/native';

import { DEVICE_WIDTH } from 'styles/metrics';
import NewsfeedCard from '../NewsfeedCardGeneric';
import Space from 'components/common/Space';
import Text from 'components/common/Text';
import colors from 'styles/colors';
import SectionWhite from '../../containers/SectionWhite';
import SectionGrey from '../../containers/SectionGrey';
import teamIcon from 'assets/images/team.svg';
import TimeAgeLabel from '../TimeAgeLabel';
import Logo from '../Logo';

const TeamCard = ({ updateEvent, detailsRoute }) => {
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
          height: updateEvent.image ? 230 : 130,
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
              {`${updateEvent.company.name} - New Hire`}
            </Text>
          </View>
          <Space size={15}/>
          <View style={{ flexDirection: 'row' }}>
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
              <Space size={10}/>
              {
                updateEvent.image
                  ? (
                    <Image
                      source={{ uri: updateEvent.image }}
                      style={{
                        width: DEVICE_WIDTH - 129,
                        height: 100,
                        resizeMode: 'contain',
                      }}
                    />
                  )
                  : null
              }
            </View>
          </View>
        </SectionWhite>
        <SectionGrey>
          <SvgUri
            source={teamIcon}
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

export default TeamCard;