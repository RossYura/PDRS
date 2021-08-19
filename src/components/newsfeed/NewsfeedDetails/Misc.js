import React from 'react';
import { View } from 'react-native';
import SvgUri from 'expo-svg-uri';

import ScreenContainer from 'containers/ScreenContainer';
import Text from 'components/common/Text';
import Space from 'components/common/Space';
import Card from 'components/common/Card';
import colors from 'styles/colors';
import miscIcon from 'assets/images/misc.svg';
import { getGreenWords } from '../NewsfeedIndex/utils';
import Logo from '../NewsfeedIndex/components/Logo';
import LinkTitle from '../NewsfeedIndex/components/LinkTitle';

class NewsfeedDetailsMisc extends React.Component {

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
                alignItems: 'center'
              }}
            >
              <Logo updateEvent={updateEvent}/>
              <Space size={7} horizontal/>
              <LinkTitle
                updateEvent={updateEvent}
              >
                <Text
                  bold
                  fontSize={13}
                  color={colors._darkblue}
                  lineHeight={16}
                >
                  {
                    updateEvent.company
                      ? `${updateEvent.company.name} - Update`
                      : 'Update'
                  }
                </Text>
                <Space size={5} horizontal/>
                <SvgUri source={miscIcon}/>
              </LinkTitle>
            </View>
            <Text
              fontSize={13}
              color="#979797"
            >
              {`Published ${updateEvent.timeAge} ago`}
            </Text>
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

export default NewsfeedDetailsMisc;
