import React from 'react';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgUri from 'expo-svg-uri';
import * as Amplitude from 'expo-analytics-amplitude';
import { LinearGradient } from 'expo-linear-gradient';

import Text from 'components/common/Text';
import colors from 'styles/colors';
import Space from 'components/common/Space';
import Card from 'components/common/Card';
import {
  formatWithDotSeparators,
  arraySum,
} from 'utils/number';
import styles from '../styles';
import MonolithProgressBar
  from 'components/common/progressBars/MonolithProgressBar';
import Duration from 'components/common/Duration';
import { AMP_CHIP_IN_TAP } from 'static/constants/amplitudeEventTypes';
import NavigationService from 'services/navigation';
import chipInInvestors from 'assets/images/chipInInvestors.svg';
import { DEVICE_WIDTH } from 'styles/metrics';
import GradientText from 'components/common/GradientText';
import InnerShadowContainer from 'containers/common/InnerShadowContainer';
import { AMP_STARTUP_SHOW_TAP } from 'static/constants/amplitudeEventTypes';
import { setAmplitudeEventWithProperties } from 'services/analytics/amplitude';
import CashIcon from 'assets/images/cash.svg';
import useUser from 'hooks/useUser';

const onChipInDialogOpen = (match) => {
  const { company, userInvestments, allInvestments } = match;
  //analytics
  Amplitude.logEvent(
    AMP_CHIP_IN_TAP,
  );
  //analytics

  NavigationService.CommonActions.navigate(
    'Modals',
    {
      screen: 'ChipInAmount',
      params: {
        company,
        match,
        investments: allInvestments,
        userInvestments,
      },
    },
  );
};

const onStartupCardPress = (match) => {
  NavigationService.navigate('StartupShow', { matchId: match.id });

  setAmplitudeEventWithProperties(AMP_STARTUP_SHOW_TAP, {
    startupID: match.companyId,
    startupName: match.company.name,
  });
};

const StartupCard = ({ match }) => {
  const user = useUser();
  const { company, userInvestments, userId, allInvestments } = match;

  const userRelatedInvestments = userInvestments
    .filter((investment) => investment.userId === +userId);

  const { category, keywords } = company;

  const keywordNames = keywords.map(item => item.name);
  keywordNames.unshift(category);

  const showProgress = arraySum(allInvestments.map(({ amount }) => amount)) >= 10000 ||
    arraySum(userRelatedInvestments.map(({ amount }) => amount)) > 0;

  const investorsChipped = userInvestments.map(investment => investment.userId)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <Card
      key={match.id}
      style={{
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        marginBottom: 10,
        elevation: 10,
      }}
      onPress={() => onStartupCardPress(match)}
    >
      {
        user.fundParticipant ? (
          <View
            style={{
              borderRadius: 12,
              width: 256,
              height: 25,
              backgroundColor: '#fff',
              position: 'absolute',
              right: 0,
              top: -2,
              zIndex: 9999,
              alignItems: 'center',
              paddingLeft: 8,
              overflow: 'visible',
              flexDirection: 'row'
            }}
          >
            <Text
              fontSize={12}
              color="#04344A"
            >
              You’ve also participated through the fund!
            </Text>
            <Space horizontal size={2}/>
            <View
              style={{
                borderRadius: 35/2,
                width: 35,
                height: 35,
                backgroundColor: '#4CD964',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 5
              }}
            >
              <SvgUri source={CashIcon} />
            </View>
          </View>
        ) : null
      }
      <ImageBackground
        source={{ uri: company.companyBannerImage }}
        style={{
          justifyContent: 'flex-end',
          height: 300,
        }}
        imageStyle={{ 
          borderRadius: 10,
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
          style={styles.titleContainer}
        >
          <Text
            color="#ffffff"
            fontSize={24}
            bold
          >
            {company.name}
          </Text>
          <Text
            color="#ffffff"
            fontSize={12}
          >
            {category}
          </Text>
          <Space size={5}/>
        </LinearGradient>
      </ImageBackground>   
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 15,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={styles.investorsContainer}
        >
          {/*<SvgUri*/}
          {/*  source={chipInInvestors}*/}
          {/*  fill={colors._darkviolet}*/}
          {/*  style={{*/}
          {/*    width: 25,*/}
          {/*    height: 15,*/}
          {/*    marginRight: 5,*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<Text*/}
          {/*  color={colors._gray}*/}
          {/*  fontSize={8}*/}
          {/*  bold*/}
          {/*  style={{*/}
          {/*    marginTop: 3,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {*/}
          {/*    investorsChipped.length */}
          {/*      ? `${investorsChipped.length} Investor${investorsChipped.length < 2 ? '' : 's'} chipped in`*/}
          {/*      : 'Be the first investor to chip in!'*/}
          {/*  }*/}
          {/*</Text>*/}
        </View>
        <Text
          color={colors._darkblue}
          fontSize={12}
          style={{
            marginVertical: 15,
            textAlign: 'center',
          }}
        >
          {company.summary}
        </Text>
        <View
          style={[
            styles.goalContainer,
            !showProgress && {
              justifyContent: 'center',
              marginBottom: 10,
            }
          ]}
        >
          <Text 
            style={[
              styles.tag,
            ]}
          >
            Funding Goal
          </Text>
          <View>
            <GradientText
              text={`€${formatWithDotSeparators(company.requiredFundingAmount)}`}
              svgHeight={21} 
              svgWidth={(DEVICE_WIDTH - 64) / 2} 
              fontSize={17} 
              viewStyle={{
                paddingBottom: 10,
              }}
              position={'start'}
            />
          </View>
        </View>
        <MonolithProgressBar
          progress1={
            allInvestments
              .filter(investment => investment.userId !== +userId)
              .reduce((total, { amount }) => amount + total, 0)
          }
          progress2={
            userRelatedInvestments.reduce((
              total,
              { amount },
            ) => amount + total, 0)
          }
          total={
            company.requiredFundingAmount
          }
          renderAnchorTip={showProgress}
          placeholder={(
            <Text
              fontSize={10}
              color="#90A7BA"
              textAlign="center"
              style={{
                paddingTop: 4
              }}
            >
              Be the first to chip in!
            </Text>
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'flex-end',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Text
              color={colors._gray}
              fontSize={12}
            >
              Pitchdrive Score
            </Text> 
            <InnerShadowContainer
              containerStyles={{
                height: 60,
                width: 60,
                borderRadius: 30,
              }}
            >
              <GradientText
                text={company.overallPdScore*10}
                svgHeight={21} 
                svgWidth={25}
                fontSize={17}
                fontWeight={'normal'}
              />
            </InnerShadowContainer>
          </View>
          <TouchableOpacity
            style={{
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowColor: 'rgba(0, 0, 0, 0.25)',
              elevation: 10,
              marginBottom: 7,
              overflow: 'visible',
              shadowOpacity: 1,
              shadowRadius: 2,
            }}
            onPress={() => onChipInDialogOpen(match)}
          >
            <LinearGradient
              colors={[
                '#431377',
                '#0082AB']}
              start={[0, 0]}
              end={[1, 0]}
              locations={[0.3, 0.7]}
              style={styles.chipInButton}
            >
              <Text
                color="#ffffff"
                fontSize={24}
              >
                Chip In!
              </Text>
            </LinearGradient> 
          </TouchableOpacity>        
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: 5,
            justifyContent: 'space-between',
          }}
        >
          <Duration
            color={colors._gray}
            endDate={match.endDate}
            timeIconStyle={{
              color: colors._gray,
              transform: [{rotateY: '180deg'}],
            }}
            size={12}
          />
          <Text
            color={colors._gray}
            fontSize={12}
          >
            {`Est. valuation: €${formatWithDotSeparators(company.valuation)}`}
          </Text>
        </View>
      </View> 
      <View
        style={styles.startuplogo}
      >
        <Image
          source={{ uri: company.companyLogo }}
          style={{
            width: 35,
            height: 35,
          }}
          resizeMode='cover'
        />
      </View>
    </Card>
  );
};

export default StartupCard;