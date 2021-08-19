import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { TabView } from 'react-native-tab-view';
import { PortfolioActions } from 'redux/actions';
import { PortfolioSelectors } from 'redux/selectors';
import Text from 'components/common/Text';
import {
  expandCompanyNewsfeed,
  getCompanyNewsfeed,
  getPortfolioShowById,
  updateActiveSections,
} from 'redux/portfolio/actions';
import styles from './styles';
import ScreenContainer from 'containers/ScreenContainer';
import Space from 'components/common/Space';
import {
  arraySum,
} from 'utils/number';
import DeltaLabel from 'components/common/DeltaLabel';
import Button from 'components/common/Button';
import {
  isInvestmentCompanyCompleted,
  isPaymentWaitingForConfirmation,
  isPaymentCompleted,
} from '../PortfolioIndex/utils';
import withUser from 'HOCs/withUser';
import withTheme from 'HOCs/withTheme';
import PaymentModal from 'components/common/modals/ChipIn/Payment';
import { showModal } from 'redux/common/actions';
import { conditionalSwitch } from 'utils/common';
import FeedTab from './components/tabs/FeedTab';
import InfoTab from './components/tabs/InfoTab';
import { getCompanyNewsFeedSelector } from 'redux/portfolio/selectors';
import { getLoaderStatusByKey } from 'redux/common/selectors';
import { EXPAND_COMPANY_NEWS_FEED_LOADING_KEY } from './constants';
import TabBar from 'components/common/TabView/components/TabBar';
import TabBarWhite from 'components/common/TabView/components/TabBarWhite';
import { DEVICE_WIDTH } from 'styles/metrics';
import MetricsTab from './components/tabs/MetricsTab';
import PaymentButton from './components/PaymentButton';

class PortfolioShow extends React.Component {
  state = {
    scrollPosition: null,
    tab1Height: 0,
    tab2Height: 0,
    tab3Height: 0,
    tabsNavState: {
      index: 0,
      routes: [
        { key: 'first', title: 'Metrics' },
        { key: 'second', title: 'Feed' },
        { key: 'third', title: 'Info' },
      ],
    },
  };

  componentDidUpdate () {
    if (typeof (this.state.scrollPosition) === 'number') {
      this.setState({ scrollPosition: null });
    }
  }

  reloadHandler = () => {
    const { getPortfolioShowById, getCompanyNewsfeed, route: { params } } = this.props;

    return Promise.all([
      getPortfolioShowById(params.companyId),
      getCompanyNewsfeed(params.companyId),
    ]);
  };

  handleScreenScroll = (e) => {
    const { index } = this.state.tabsNavState;

    if (index === 1) {
      const { expandCompanyNewsfeed, companyNewsfeed: { currentPage, pagesTotal }, isExpandLoading, portfolio: { company } } = this.props;
      const {
        contentOffset: { y: contentOffset },
        contentSize: { height: contentSize },
      } = e.nativeEvent;

      if (contentOffset / contentSize > 0.4 && currentPage < pagesTotal &&
        !isExpandLoading) {
        expandCompanyNewsfeed(company.id, currentPage + 1);
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
    const {
      portfolio: { company },
    } = this.props;
    const { route: { params: routeParams } } = this.props;

    switch (route.key) {
    case 'second':
      return <FeedTab
        scrollToPosition={(y) => this.setState({ scrollPosition: y })}
        setHeight={this.setHeight}
      />;
    case 'third':
      return <InfoTab
        goBackUrl="investorUpdates"
        setHeight={this.setHeight}
        webViewerPassedProps={{
          goBackUrl: 'PortfolioShow',
          params: { ...routeParams },
        }}
      />;
    case 'first':
      return <MetricsTab
        goBackUrl='PortfolioShow'
        setHeight={this.setHeight}
        company={company}
      />;
    default:
      return null;
    }
  };

  render () {
    const {
      portfolio: { company },
      navigation,
      route: { params },
    } = this.props;
    const backPath = params && params.backPath;

    const { index } = this.state.tabsNavState;

    const SCREEN_GRADIENT_HEIGHT = company && company.companyBannerImage ? 300 : 200;

    return (
      <ScreenContainer
        navHeader
        navHeaderShade
        backgroundHeader
        reloadHandler={this.reloadHandler}
        scrollPosition={this.state.scrollPosition}
        gradientBanner={company.companyBannerImage}
        navHeaderBackHandler={() => navigation.navigate(backPath)}
        navHeaderContent={(
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Image
              source={{ uri: company.companyLogo }}
              style={styles.logoHeader}
              resizeMode='contain'
            />
            <Space horizontal size={10}/>
            <View style={{ flex: 1 }}>
              <Text
                fontSize={17}
                color="#ffffff"
              >
                {company.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
              >
                <Text
                  color="#ffffff"
                >
                  {company.category}
                </Text>
                <DeltaLabel
                  comparable={company.companyDeltaScoreMonthlyChange}
                  textStyle={{
                    color: '#ffffff',
                  }}
                />
              </View>
            </View>
          </View>
        )}
        contentPadding={0}
        gradientHeight={SCREEN_GRADIENT_HEIGHT}
        contentOffsetTop={SCREEN_GRADIENT_HEIGHT - 50}
        ContainerComponentProps={{
          onScroll: this.handleScreenScroll,
          scrollEventThrottle: 50,
        }}
      >
        <PaymentModal/>
        {
          conditionalSwitch(
            {
              condition: !params.isPdFund &&
                isInvestmentCompanyCompleted(company) &&
                !isPaymentWaitingForConfirmation(company) &&
                !isPaymentCompleted(company),
              result: (
                <React.Fragment>
                  <PaymentButton
                    refCode={params.refCode}
                    reloadHandler={this.reloadHandler}
                    company={company}
                  />
                  <Space size={2}/>
                </React.Fragment>
              ),
            },
            {
              condition: conditionalSwitch.CONDITIONS.DEFAULT,
              result: <Space size={50}/>,
            },
          )
        }
        <TabView
          style={this.state.tab1Height && this.state.tab2Height &&
          this.state.tab3Height && {
            height: index === 0 && this.state.tab1Height ||
              index === 1 && this.state.tab2Height || index === 2 &&
              this.state.tab3Height,
          }}
          renderTabBar={TabBar}
          onIndexChange={index => this.setState(prevState => ({
            tabsNavState: {
              ...prevState.tabsNavState,
              index,
            },
          }))}
          navigationState={this.state.tabsNavState}
          renderScene={this.renderScene}
          initialLayout={{ width: DEVICE_WIDTH }}
        />
      </ScreenContainer>
    );
  }
}

const mapDispatchToProps = {
  ...PortfolioActions,
  getPortfolioShowById,
  updateActiveSections,
  showModal,
  getCompanyNewsfeed,
  expandCompanyNewsfeed,
};

const mapStateToProps = state => ({
  portfolio: PortfolioSelectors.getCompanyUpdateLogsWithSortedUpdates(state),
  activeSections: PortfolioSelectors.getActiveSections(state),
  companyNewsfeed: getCompanyNewsFeedSelector(state),
  isExpandLoading: getLoaderStatusByKey(state)(
    EXPAND_COMPANY_NEWS_FEED_LOADING_KEY),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUser,
  withTheme.describe({
    white: (props) => ({
      TabBar: TabBarWhite,
      ...props,
    }),
  }),
)(PortfolioShow);
