import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import SvgUri from 'expo-svg-uri';
import { LinearGradient } from 'expo-linear-gradient';

import NewsfeedCard from '../NewsfeedCardGeneric';
import Space from 'components/common/Space';
import Text from 'components/common/Text';
import colors from 'styles/colors';
import SectionWhite from '../../containers/SectionWhite';
import SectionGrey from '../../containers/SectionGrey';
import articleIcon from 'assets/images/article.svg';
import TimeAgeLabel from '../TimeAgeLabel';
import Logo from '../Logo';
import Title from '../Title';
import { DEVICE_WIDTH } from 'styles/metrics';
import { navigate } from 'services/navigation/actions';

class InsightCard extends React.Component {

  renderCardWithoutImage = (updateEvent) => {
    return (
      <View
        style={{
          height: updateEvent.image ? 210 : 110,
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
                  ? `${updateEvent.company.name} - Published an article`
                  : 'An article'
              }
            </Text>
          </View>
          <Space size={15}/>
          <View style={{ paddingHorizontal: 17 }}
          >
            <Text
              fontSize={13}
              color={colors._darkblue}
            >
              {`"${updateEvent.title}"`}
            </Text>
            <Space size={10}/>
            {
              updateEvent.image
                ? (
                  <Image
                    source={{ uri: updateEvent.image }}
                    style={{
                      width: DEVICE_WIDTH - 88,
                      height: 100,
                      resizeMode: 'contain',
                    }}
                  />
                )
                : null
            }
          </View>
        </SectionWhite>
        <SectionGrey>
          <SvgUri
            source={articleIcon}
            style={{
              position: 'absolute',
              left: 11,
              bottom: 9,
            }}
          />
          <TimeAgeLabel distance={updateEvent.liveAt}/>
        </SectionGrey>
      </View>
    );
  };

  renderCardWithImage = (updateEvent) => {
    const { company } = updateEvent;

    return (
      <View>
        {!updateEvent.withoutHeader &&
        <SectionGrey top>
          {company && company.companyLogo &&
          <View style={{ marginRight: 6 }}>
            <Logo updateEvent={updateEvent}/>
          </View>
          }
          {company
            ? <View
              style={{
                paddingTop: 1,
              }}
            >
              <Text
                bold
                fontSize={13}
                color={'#04344A'}
              >
                {company.name}
              </Text>
            </View>
            : <View
              style={{
                paddingTop: 1,
              }}
            >
              <Text
                bold
                fontSize={13}
                color={'#04344A'}
              >
                Portfolio update
              </Text>
            </View>
          }
          <SvgUri
            style={{ marginLeft: 6 }}
            source={articleIcon}
          />
        </SectionGrey>
        }
        <ImageBackground
          source={{ uri: updateEvent.image }}
          style={{
            justifyContent: 'flex-end',
            height: 183,
          }}
          imageStyle={{ borderRadius: 10 }}
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
      </View>
    );
  };

  render () {
    const { updateEvent, detailsRoute } = this.props;

    return (
      <NewsfeedCard
        onPress={() => navigate(
          detailsRoute,
          { updateEvent },
        )}
      >
        {updateEvent.image ?
          this.renderCardWithImage(updateEvent) :
          this.renderCardWithoutImage(updateEvent)
        }
      </NewsfeedCard>
    );
  }
}

export default InsightCard;
