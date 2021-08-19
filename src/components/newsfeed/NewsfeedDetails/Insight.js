import React from 'react';
import { View, ImageBackground, Image, ScrollView } from 'react-native';
import SvgUri from 'expo-svg-uri';
import { LinearGradient } from 'expo-linear-gradient';

import ScreenContainer from 'containers/ScreenContainer';
import Text from 'components/common/Text';
import Space from 'components/common/Space';
import Card from 'components/common/Card';
import colors from 'styles/colors';
import articleIcon from 'assets/images/article.svg';
import Logo from '../NewsfeedIndex/components/Logo';
import Title from '../NewsfeedIndex/components/Title';
import { getGreenWords } from '../NewsfeedIndex/utils';
import LinkTitle from '../NewsfeedIndex/components/LinkTitle';
import { DEVICE_HEIGHT } from 'styles/metrics';

class NewsfeedDetailsInsight extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      imageHeight: 0,
    };
  }

  renderCardWithoutImage = (updateEvent) => {
    return (
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
          <View style={{ flexDirection: 'row' }}
          >
            <Logo updateEvent={updateEvent}/>
            <Space size={7} horizontal/>
            <View>
              <Text
                bold
                fontSize={13}
                color={colors._darkblue}
                lineHeight={16}
              >
                {
                  updateEvent.company
                    ? `${updateEvent.company.name} - Published`
                    : 'Published'
                }
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  bold
                  fontSize={13}
                  color={colors._darkblue}
                  lineHeight={16}
                >
                  An Article
                </Text>
                <Space size={5} horizontal/>
                <SvgUri source={articleIcon}/>
              </View>
            </View>
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
            flexDirection: 'row'
          }}
        >
          <Logo big updateEvent={updateEvent}/>
          <Space size={15} horizontal/>
          <View 
            style={{ 
              flex: 1
            }}
          >
            <LinkTitle
              updateEvent={updateEvent}
            >
              <Text
                bold
                fontSize={13}
                color={colors._darkblue}
              >
                {`${updateEvent.title} - Published`}
              </Text>
            </LinkTitle>
            <Space size={35}/>
          </View>
        </View>
        <Space size={25}/>
        <View 
          style={{ 
            flexDirection: 'row' 
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
              flex: 1 
            }}
          >
            {getGreenWords(updateEvent.content)}
          </Text>
        </View>
      </Card>
    );
  };

  renderCardWithImage = (updateEvent) => {
    if (!this.state.imageHeight) {
      this.setImageHeight(updateEvent.image);
    }

    const { company } = updateEvent;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ 
          paddingHorizontal: 2 
        }}
        contentContainerStyle={{
          backgroundColor: '#ffffff',
          borderRadius: 10,
          paddingBottom: 30,
          shadowColor: 'rgba(0, 0, 0, 0.205611)',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 2,
          elevation: 2,
          borderColor: 'transparent',
          overflow: 'visible',
        }}
      >
        <ImageBackground
          source={{ uri: updateEvent.image }}
          style={[
            { 
              justifyContent: 'flex-end',
            },
            updateEvent.image && { height: this.state.imageHeight }
          ]}
          imageStyle={{ 
            borderRadius: 10,
            resizeMode: 'cover',
          }}
        >
          <LinearGradient
            colors={[
              'rgba(196, 196, 196, 0)',
              'rgba(23, 21, 21, 0.411458)',
              '#000000']}
            start={[0, 0]}
            end={[0, 1]}
            locations={[0.04, 0.34, 0.62]}
            style={{
              borderRadius: 10,
              paddingVertical: 15, 
              paddingHorizontal: 16,
              justifyContent: 'flex-end',
            }}
          >
            {
              <Title
                company={company}
                updateEvent={updateEvent}
              />
            }
          </LinearGradient>
        </ImageBackground>
        <Space size={10}/>
        <View 
          style={{ 
            flex: 1, 
            paddingHorizontal: 40,
          }}>
          <LinkTitle
            updateEvent={updateEvent}
          >
            <Text
              bold
              fontSize={13}
              color={colors._darkblue}
            >
              {`${updateEvent.title}`}
            </Text>
          </LinkTitle>
          <Space size={10}/>
          <Text
            fontSize={13}
            color={colors._darkblue}
            style={{ 
              flex: 1 
            }}
          >
            {getGreenWords(updateEvent.content)}
          </Text>
        </View>
      </ScrollView>
    );
  };

  setImageHeight = async (image) => {
    const promise = new Promise(
      (resolve) => {
        Image.getSize(image, (width, height) => {
          resolve({ width, height });
        });
      },
    );    

    const { width, height } = await promise;
    if (width > height) {
      this.setState({ imageHeight: 183 });
    } else {
      this.setState({ imageHeight: 360 });
    }
  }

  render () {
    const { navigation, route: { params } } = this.props;
    const { updateEvent, backPath } = params;

    return (
      <ScreenContainer
        navHeader
        contentOffsetTop={50}
        gradientHeight={updateEvent.image ? DEVICE_HEIGHT / 2 + 30 : 380}
        headerPadding={0}
        headerPreserveStatusBarSpace={false}
        navHeaderBackHandler={() => navigation.navigate(backPath)}
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
        {updateEvent.image ?
          this.renderCardWithImage(updateEvent) :
          this.renderCardWithoutImage(updateEvent)
        }
      </ScreenContainer>
    );
  }
}

export default NewsfeedDetailsInsight;
