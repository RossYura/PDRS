import React from 'react';
import { 
  Image, 
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import SvgUri from 'expo-svg-uri';

import Text from 'components/common/Text';
import colors from 'styles/colors';
import Space from 'components/common/Space';
import brainIcon from 'assets/images/brain.svg';
import lighbulbIcon from 'assets/images/lightbulb.svg';
import rocketIcon from 'assets/images/rocket.svg';
import peopleIco from 'assets/images/people.svg';
import Card from 'components/common/Card';
import { DEVICE_HEIGHT } from 'styles/metrics';
import prospectIcon from 'assets/images/prospect.png';
import blurredEstValueIcon from 'assets/images/blurredEstValue.png';
import upvoteIcon from 'assets/images/upvote.svg';
import downvoteIcon from 'assets/images/downvote.svg';

export const cardHeight = (DEVICE_HEIGHT - 180) < 650
  ? (DEVICE_HEIGHT - 180)
  : 650;

const TrendingBadge = () => (
  <View
    style={{
      height: 65,
      position: 'absolute',
      top: -15,
      right: 4,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'visible',
      zIndex: 3,
    }}
  >
    <View
      style={{
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: '#ffffff',
        height: 30,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
        shadowColor: 'rgba(0, 0, 0, 0.205611)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        paddingRight: 10,
        elevation: 2,
        borderColor: 'transparent',
      }}
    >
      <Text
        fontSize={16}
        color={colors._darkblue}
      >
        Trending!
      </Text>
    </View>
    <Image
      source={prospectIcon}
      style={{
        position: 'absolute',
        right: -25,
        top: 8,
        width: 57,
        height: 57,
        elevation: 5,
      }}
    />
  </View>
);

const CardItem = ({ company, onPressLeft, onPressRight}) => (
  <Card
    height={cardHeight}
    ContainerComponent={View}    
  >
    {
      company.interestedInvestorCount > 4 && (
        <TrendingBadge/>
      )
    }
    <View
      style={{
        width: 60,
        height: 60,
        position: 'absolute',
        top: cardHeight / 2 - 30,
        left: 16,
        zIndex: 3,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
      }}
    >
      <Image
        source={{ uri: company.companyLogo }}
        style={{
          width: 41,
          height: 41,
        }}
        resizeMode='contain'
      />
    </View>
    <View
      style={{
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      <Image
        source={{ uri: company.companyBannerImage }}
        style={{
          height: cardHeight / 2,
        }}
        resizeMode='cover'
        blurRadius={7}
      />
    </View>
    <View
      style={{
        paddingTop: cardHeight / 12 - 5,
        paddingHorizontal: 15,
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Text
        fontSize={12}
        color={colors._gray}
      >
        {company.description}
      </Text>
      <Space size={20}/>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 0.2,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingHorizontal: 5,
          }}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onPressLeft}
          >
            <SvgUri 
              source={downvoteIcon}
              style={styles.button}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.6,
            justifyContent: 'space-around',
            alignItems: 'center',
            maxHeight: 100,
            paddingLeft: 10,
          }}
        >
          {
            company.category ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <SvgUri source={brainIcon}/>
                <Space size={25} horizontal/>
                <Text
                  fontSize={12}
                  color={colors._gray}
                >
                  {company.category}
                </Text>
              </View>
            ) : null
          }
          {
            company.keywords ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <SvgUri source={lighbulbIcon}/>
                <Space size={25} horizontal/>
                <Text
                  fontSize={12}
                  color={colors._gray}
                >
                  {company.keywords}
                </Text>
              </View>
            ) : null
          }
          {
            company.companyStage ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <SvgUri source={rocketIcon}/>
                <Space size={25} horizontal/>
                <Text
                  fontSize={12}
                  color={colors._gray}
                >
                  {company.companyStage}
                </Text>
              </View>
            ) : null
          }
        </View>
        <View
          style={{
            flex: 0.2,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            paddingHorizontal: 5,
          }}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onPressRight}
          >
            <SvgUri 
              source={upvoteIcon}
              style={[
                styles.button,
                {
                  paddingTop: 0,
                }
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 15,
      }}
    >
      <View
        style={{
          flex: 0.5,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <SvgUri
          source={peopleIco}
        />
        <Space horizontal size={10}/>
        <Text
          color={colors._deepblue}
          fontSize={8}
        >
          {`${company.interestedInvestorCount} Investors are interested`}
        </Text>
      </View>
      <View
        style={{
          flex: 0.5,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Text
          fontSize={12}
          color={colors._gray}
        >
          Est. valuation:
        </Text>
        <Space horizontal size={5}/>
        <Image source={blurredEstValueIcon}/>
      </View>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,    
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.205611)',
      },
    }),
  },
  button: {
    height: 48,
    width: 48,
    paddingTop: 4,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CardItem;