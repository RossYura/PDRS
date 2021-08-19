import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import { Video, Audio } from 'expo-av';
import { connect } from 'react-redux';
import Svg from 'expo-svg-uri';
import compose from 'recompose/compose';
import { TabView } from 'react-native-tab-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { StartupActions } from 'redux/actions';
import { StartupSelectors } from 'redux/selectors';
import { showModal, hideModal } from 'redux/common/actions';
import withUser from 'HOCs/withUser';
import ScreenContainer from 'containers/ScreenContainer';
import Duration from 'components/common/Duration';
import Button from 'components/common/Button';
import playIco from 'assets/images/play.svg';
import HR from 'components/common/HR';
import Text from 'components/common/Text';
import styles from './styles';
import FractionsProgressBar
  from 'components/common/progressBars/FractionsProgressBar';
import colors from 'styles/colors';
import chipInIco from 'assets/images/icon_chipIn.svg';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from 'styles/metrics';
import Space from 'components/common/Space';
import { arraySum, formatWithCommaSeparators } from 'utils/number';
import { isIphoneX } from 'utils/device';
import CompanyTab from './components/tabs/CompanyTab';
import TractionTab from './components/tabs/TractionTab';
import QATab from './components/tabs/QATab';
import NavigationService from 'services/navigation';

class StartupShow extends React.Component {
  state = {
    shouldPlayVideo: false,
    question: '',
    videoFullscreenEvent: null,
    videoLoading: true,
    tab1Height: 0,
    tab2Height: 0,
    tab3Height: 0,
    scrollPosition: null,
    tabsNavState: {
      index: 0,
      routes: [
        { key: 'first', title: 'The company' },
        { key: 'second', title: 'Traction' },
        { key: 'third', title: 'Founder Q&A' },
      ],
    },
  };

  _textInputRef = {
    ref: null,
  };

  onChipInDialogOpen = () => {
    const { company, match, allInvestments, userInvestments } = this.props.selectedMatch;

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

  reload = () => {
    const { getStartupMatchById, route: { params } } = this.props;

    getStartupMatchById(params.matchId);
  };

  handleVideoOpen = async () => {
    await Audio.setAudioModeAsync({ 
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      shouldDuckAndroid: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });

    if (Platform.OS === 'ios') {
      await Audio.setIsEnabledAsync(true);
      this.sound = new Audio.Sound();
      try {
        await this.sound.loadAsync(require('assets/media/silence.mp3'));
        await this.sound.playAsync();
        this.sound.setIsMutedAsync(false);
        this.sound.setIsLoopingAsync(true);
      } catch (error) {
        console.log(error.message);
      }
    }

    if (!this.state.videoLoading) {
      try{
        this.pitchVideo.presentFullscreenPlayer();
      } catch (e) {
        console.log(e.message);
      }      
    }
  };

  setHeight = (index, height) => {
    switch (index) {
    case 0:
      this.setState({ tab1Height: height });
      break;
    case 1:
      this.setState({ tab2Height: height });
      break;
    case 2:
      this.setState({ tab3Height: height });
      break;
    default:
      break;
    }
  };

  renderScene = ({ route }) => {
    switch (route.key) {
    case 'first':
      return (
        <CompanyTab
          setHeight={this.setHeight}
          webViewerPassedProps={{
            goBackUrl: 'StartupShow',
            params: { ...this.props.route.params },
          }}
        />
      );
    case 'second':
      return (
        <TractionTab
          setHeight={this.setHeight}
        />
      );
    case 'third':
      return (
        <QATab
          setHeight={this.setHeight}
          _textInputRef={this._textInputRef}
        />
      );
    default:
      return null;
    }
  };

  async componentDidUpdate (prevProps, prevState) {
    if ((prevState.tab3Height && prevState.tab3Height < this.state.tab3Height) &&
      prevState.tab3Height) {
      const height = this.state.tab3Height;
      this.setState({ scrollPosition: height });
    } else if (prevState.tab3Height > this.state.tab3Height) {
      this.setState({ scrollPosition: null });
    }

    if (prevState.videoFullscreenEvent === 1 && this.state.videoFullscreenEvent === 2) {
      this.pitchVideo.pauseAsync();
      if (Platform.OS === 'ios' && this.sound) {
        await this.sound.unloadAsync();
      }
    }
  }

  componentWillUnmount() {
    if (this.state.videoFullscreenEvent) {
      this.pitchVideo.stopAsync();
    }
  }

  returnTerm = (title, text) => (
    <View
      key={title}
      style={styles.termContainer}
    >
      <View style={styles.termTitle}>
        <View style={styles.point}/>
        <Text
          fontSize={13}
          color="#90A7BA"
        >
          {title}
        </Text>
      </View>
      <View style={styles.termContent}>
        <Text
          textAlign="right"
          fontSize={13}
          color="#104F74"
        >
          {text}
        </Text>
      </View>
    </View>
  )

  render () {
    const { user, selectedMatch } = this.props;
    const {
      company,
      teamMembers,
      pitchVideoUrl,
      allInvestments,
      userInvestments,
      match,
    } = selectedMatch;

    const userRelatedInvestments = userInvestments
      .filter((investment) => investment.userId === +user.userId);

    const { index } = this.state.tabsNavState;

    return (
      <ScreenContainer
        loading={!teamMembers}
        reloadHandler={this.reload}
        ScrollViewOverflowTopBGColor="#ffffff"
        ScrollViewOverflowTopSpinnerColor={colors._gray}
        scrollPosition={this.state.scrollPosition}
        gradientBanner={company.companyBannerImage}
        headerOffsetTop={0}
        headerPreserveStatusBarSpace={false}
        navHeader
        navHeaderShade
        navHeaderContent={(
          <React.Fragment>
            <Image
              source={{ uri: company.companyLogo }}
              style={styles.logo}
              resizeMode='contain'
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {company.name}
              </Text>
              <Text style={styles.category}>
                {company.category}
              </Text>
            </View>
            <Duration
              color="#ffffff"
              endDate={match.endDate}
            />
          </React.Fragment>
        )}
        overlayButton={(
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              position: 'absolute',
              top: isIphoneX()
                ? DEVICE_HEIGHT - 65 - Constants.statusBarHeight - 70
                : DEVICE_HEIGHT - 65 - Constants.statusBarHeight - 50,
              right: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              zIndex: 100,
            }}
            onPress={this.onChipInDialogOpen}
          >
            <Svg
              source={chipInIco}
            />
          </TouchableOpacity>
        )}
        ContainerComponent={KeyboardAwareScrollView}
        ContainerComponentProps={{
          getTextInputRefs: () => { return [this._textInputRef.ref];},
          keyboardShouldPersistTaps: 'handled',
          ref: (r) => { this._scrollViewRef = r; },
        }}
      >
        <View
          style={styles.videoButtonContainer}
        >
          <Video
            ref={ref => this.pitchVideo = ref}
            source={{ uri: pitchVideoUrl }}
            resizeMode="contain"
            rate={1.0}
            volume={1.0}
            isMuted={false}
            onError={(e) => {
              console.log(e);
            }}
            onLoad={() => {
              this.setState({
                videoLoading: false,
              });
            }}
            onFullscreenUpdate={(e) => {
              this.setState({ 
                videoFullscreenEvent: e.fullscreenUpdate 
              });
            }}
          />
          <Button
            loading={this.state.videoLoading}
            width={193}
            height={46}
            onPress={this.handleVideoOpen}
            style={{
              borderRadius: 23,
              backgroundColor: '#0082AB',
            }}
            content={(
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.videoText}>Watch the pitch</Text>
                <Svg
                  source={playIco}
                  width={24}
                  height={24}
                />
              </View>
            )}
          />
        </View>
        <Text style={styles.text_big_description}>
          {company.description}
        </Text>
        <HR/>
        <Text
          bold
          fontSize={12}
          color="#90A7BA"
        >
          THE DEAL
        </Text>
        <View style={styles.goalContent}>
          <View>
            <Text style={[styles.text_mid_header]}>
              {/*Valuation*/}
            </Text>
            <Text style={styles.text_mid_amount}>
              {`Funding progress: €${formatWithCommaSeparators(arraySum(allInvestments.map(({ amount }) => amount)))}`}
            </Text>
          </View>
          <View>
            <Text
              style={[styles.text_mid_header, styles.rightAlign]}
            >
              Funding goal
            </Text>
            <Text
              style={[styles.text_mid_amount, styles.rightAlign]}
            >
              {`€${company.requiredFundingAmount && 
                formatWithCommaSeparators(company.requiredFundingAmount)}`}
            </Text>
          </View>
        </View>
        <View style={{ height: 12 }}/>
        {
          (
            arraySum(allInvestments.map(({ amount }) => amount)) >= 10000
            ||
            arraySum(userRelatedInvestments.map(({ amount }) => amount)) > 0
          ) && (
            <FractionsProgressBar
              progress1={
                allInvestments
                  .filter(({ userId }) => userId !== +user.userId)
                  .reduce((total, { amount }) => total + amount, 0)
              }
              progress2={
                userInvestments
                  .reduce((total, { amount }) => total + amount, 0)
              }
              total={company.requiredFundingAmount}
            />
          )
        }
        <HR/>
        {
          company.companyTerms
            ? (
              <>
                <Text
                  bold
                  fontSize={12}
                  color="#90A7BA"
                  style={{
                    marginBottom: 10,
                  }}
                >
                  THE TERMS
                </Text>
                {
                  company.companyTerms.split('\n')
                    .map(entry => entry.split(': '))
                    .map(([title, value]) => this.returnTerm(title, value))
                }
                <HR/>
              </>
            )
            : null
        }
        <TabView
          style={this.state.tab1Height && this.state.tab2Height &&
          this.state.tab3Height && {
            height: index === 0 && this.state.tab1Height ||
              index === 1 && this.state.tab2Height || index === 2 &&
              this.state.tab3Height,
          }}
          renderTabBar={({ jumpTo, navigationState: { routes, index } }) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                }}
              >
                {
                  routes.map(({ key, title }, i) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => jumpTo(key)}
                      style={{
                        paddingBottom: 5,
                        borderBottomWidth: 2,
                        borderBottomColor: index === i
                          ? '#1883D7'
                          : 'transparent',
                        paddingHorizontal: 3,
                      }}
                    >
                      <Text
                        fontSize={14}
                        color="#0F496B"
                      >
                        {title}
                      </Text>
                    </TouchableOpacity>
                  ))
                }
              </View>
            );
          }}
          navigationState={this.state.tabsNavState}
          onIndexChange={index => this.setState(prevState => ({
            tabsNavState: {
              ...prevState.tabsNavState,
              index,
            },
          }))}
          initialLayout={{ width: DEVICE_WIDTH }}
          renderScene={this.renderScene}
        />
        <Space size={80}/>
      </ScreenContainer>
    );
  }
}

const mapDispatchToProps = {
  ...StartupActions,
  showModal,
  hideModal,
};
const mapStateToProps = state => ({
  selectedMatch: StartupSelectors.getStartupSelectedMatch(state),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withUser,
)(StartupShow);
