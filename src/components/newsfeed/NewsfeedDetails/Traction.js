import React from 'react';
import { View, Image } from 'react-native';
import SvgUri from 'expo-svg-uri';

import ScreenContainer from 'containers/ScreenContainer';
import Text from 'components/common/Text';
import Space from 'components/common/Space';
import Card from 'components/common/Card';
import colors from 'styles/colors';
import { DEVICE_WIDTH } from 'styles/metrics';
import tractionIcon from 'assets/images/traction.svg';
import Logo from '../NewsfeedIndex/components/Logo';
import { getGreenWords } from '../NewsfeedIndex/utils';
import LinkTitle from '../NewsfeedIndex/components/LinkTitle';

class NewsfeedDetailsTraction extends React.Component {

  render () {
    const { navigation, route: { params } } = this.props;
    const { updateEvent, backPath } = params;

    return (
      <ScreenContainer
        navHeader
        navHeaderBackHandler={() => navigation.navigate(backPath)}
        contentOffsetTop={50}
        gradientHeight={380}
        headerPadding={0}
        headerOffsetTop={0}
        headerPreserveStatusBarSpace={false}
        navHeaderContent={(
          <Text
            fontSize={36}
            color={'#ffffff'}
            bold
          >
            Updates
          </Text>
        )}
      >     
        <Space size={20}/>
        <Card
          ContainerComponent={View}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 14,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Logo updateEvent={updateEvent}/>
              <Space size={7} horizontal/>
              <LinkTitle
                updateEvent={updateEvent}
              >
                <View>
                  {
                    updateEvent.company
                      ? (
                        <Text
                          bold
                          fontSize={13}
                          color={colors._darkblue}
                          lineHeight={16}
                        >
                          {`${updateEvent.company.name} -`}
                        </Text>
                      )
                      : null
                  }
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Space horizontal size={15}/>
                    <Text
                      bold
                      fontSize={13}
                      color={colors._darkblue}
                      lineHeight={16}
                    >
                      Partnership
                    </Text>
                    <Space size={5} horizontal/>
                    <SvgUri source={tractionIcon}/>
                  </View>
                </View>
              </LinkTitle>
            </View>
            <Text
              fontSize={13}
              color="#979797"
              fontWeight={300}
            >
              {`Published ${updateEvent.timeAge} ago`}
            </Text>
          </View>
          <Space size={17}/>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Logo big updateEvent={updateEvent}/>
            <Space size={15} horizontal/>
            <View
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text
                  bold
                  fontSize={13}
                  color={colors._darkblue}
                >
                  {updateEvent.title}
                </Text>
              </View>
              <Space size={35}/>
              {
                updateEvent.image
                  ? (
                    <Image
                      source={{ uri: updateEvent.image }}
                      style={{
                        width: DEVICE_WIDTH - 75 - 32,
                        height: 100,
                        resizeMode: 'contain',
                      }}
                    />
                  )
                  : null
              }
            </View>
          </View>
          <Space size={25}/>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                width: 1,
                height: '100%',
                marginRight: 35,
                marginLeft: 17,
                backgroundColor: colors._darkblue,
              }}
            />
            <Text
              fontSize={13}
              color={colors._darkblue}
              style={{
                flex: 1,
              }}
            >
              {getGreenWords(updateEvent.content)}
            </Text>
          </View>
        </Card>
      </ScreenContainer>
    );
  }
}

export default NewsfeedDetailsTraction;
