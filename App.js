import React from 'react';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import axios from 'axios';
import * as Sentry from 'sentry-expo';
import {
  DEV_API_URL,
  TEST_API_URL,
  PROD_API_URL,
  SENTRY_URL,
  AMPLITUDE_KEY,
} from 'react-native-dotenv';
import * as Amplitude from 'expo-analytics-amplitude';
import Constants from 'expo-constants';
import { AppearanceProvider } from 'react-native-appearance';

import store from 'redux/store';
import { cacheFonts, cacheImages } from 'utils/cache';
import AppRoot from 'containers/AppRoot';
import { AMP_APP_OPENED } from 'static/constants/amplitudeEventTypes';
import SentryService from 'services/analytics/sentry';

import 'lib/flashMessage';

if (__DEV__) {
  require('./src/config/initializers/reactotron');
  require('./src/config/initializers/env');

  global.Reactotron = require('reactotron-react-native').default;
}

export default class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isReady: false,
    };

    this.setBaseURL(Constants.manifest.releaseChannel);
    SentryService.init();
  }

  async componentDidMount () {
    if (!__DEV__) {
      await Amplitude.initialize(AMPLITUDE_KEY);
      await Amplitude.logEvent(AMP_APP_OPENED);
    }
  }

  componentDidCatch (error, errorInfo) {
    SentryService.ensureInit();
    Sentry.captureException(error, {
      extra: errorInfo,
    });
  }

  setBaseURL = (releaseChannel) => {
    let serverUrl = '';
    if (releaseChannel === undefined) {
      serverUrl = DEV_API_URL;
    } else if (releaseChannel.indexOf('test') !== -1) {
      serverUrl = DEV_API_URL;
    } else if (releaseChannel.indexOf('default') !== -1) {
      serverUrl = TEST_API_URL;
    } else if (releaseChannel.indexOf('staging') !== -1) {
      serverUrl = TEST_API_URL;
    } else if (releaseChannel.indexOf('prod') !== -1) {
      serverUrl = PROD_API_URL;
    }

    axios.defaults.baseURL = serverUrl;
  };

  async _loadAssetsAsync () {
    const imageAssets = cacheImages([
      require('./src/assets/images/icon_problem.png'),
      require('./src/assets/images/icon_solution.png'),
      require('./src/assets/images/icon_howtowork.png'),
      require('./src/assets/images/icon_businessmodel.png'),
      require('./src/assets/images/icon_market.png'),
      require('./src/assets/images/icon_competition.png'),
      require('./src/assets/images/icon_info.png'),
      require('./src/assets/images/select_arrow.png'),
      require('./src/assets/images/datepicker_icon.png'),
      require('./src/assets/images/stats_up.svg'),
      require('./src/assets/images/list_item_mark.svg'),
      require('./src/assets/images/welcome_splash.png'),
      require('./src/assets/images/check.svg'),
      require('./src/assets/images/close.svg'),
      require('./src/assets/images/plus.svg'),
      require('./src/assets/images/minus.svg'),
      require('./src/assets/images/suitcase.svg'),
      require('./src/assets/images/money_bag.svg'),
      require('./src/assets/images/investing.svg'),
      require('./src/assets/images/back.svg'),
      require('./src/assets/images/investments.svg'),
      require('./src/assets/images/profile.svg'),
      require('./src/assets/images/discovery.svg'),
      require('./src/assets/images/play.svg'),
      require('./src/assets/images/send.svg'),
      require('./src/assets/images/icon_chipIn.svg'),
      require('./src/assets/images/portfolio_header.png'),
      require('./src/assets/images/latest_lightning.svg'),
      require('./src/assets/images/header_logo.svg'),
      require('./src/assets/images/rocket.png'),
      require('./src/assets/images/welcome_2.png'),
      require('./src/assets/images/discovery_no_data.png'),
      require('./src/assets/images/success_new.png'),
      require('./src/assets/images/status.svg'),
      require('./src/assets/images/question.svg'),
      require('./src/assets/images/contract.svg'),
      require('./src/assets/images/contract_min.png'),
      require('./src/assets/images/alert.svg'),
      require('./src/assets/images/people.svg'),
      require('./src/assets/images/globe.svg'),
      require('./src/assets/images/pin.svg'),
      require('./src/assets/images/newsfeed.svg'),
      require('./src/assets/images/article.svg'),
      require('./src/assets/images/traction.svg'),
      require('./src/assets/images/link.svg'),
      require('./src/assets/images/misc.svg'),
      require('./src/assets/images/team.svg'),
      require('./src/assets/images/logo_s.svg'),
      require('./src/assets/images/logo_m.svg'),
      require('./src/assets/images/camera.svg'),
      require('./src/assets/images/edit.svg'),
      require('./src/assets/images/dialog.svg'),
      require('./src/assets/images/key.svg'),
      require('./src/assets/images/details.svg'),
      require('./src/assets/images/balance.svg'),
      require('./src/assets/images/people1.svg'),
      require('./src/assets/images/people2.svg'),
      require('./src/assets/images/onboarding1.png'),
      require('./src/assets/images/onboarding2.png'),
      require('./src/assets/images/onboarding3.png'),
      require('./src/assets/images/onboarding4.png'),
      require('./src/assets/images/alert_big.svg'),
      require('./src/assets/images/prospect.png'),
      require('./src/assets/images/rocket.svg'),
      require('./src/assets/images/lightbulb.svg'),
      require('./src/assets/images/brain.svg'),
      require('./src/assets/images/downvote.svg'),
      require('./src/assets/images/upvote.svg'),
      require('./src/assets/images/upload.png'),
      require('./src/assets/images/magifying_glass.svg'),
      require('./src/assets/images/favorite.svg'),
      require('./src/assets/images/blurredEstValue.png'),
      require('./src/assets/images/chipInInvestors.svg'),
      require('./src/assets/images/baloons.png'),
      require('./src/assets/images/tree.png'),
      require('./src/assets/images/swipe_left.svg'),
    ]);

    const fontAssets = cacheFonts([
      {
        'ProximaNova_Regular': require(
          './src/assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
        'ProximaNova_Light': require(
          './src/assets/fonts/ProximaNova/ProximaNova-Thin.otf'),
        'ProximaNova_Bold': require(
          './src/assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
      }]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render () {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <AppearanceProvider>
          <AppRoot/>
        </AppearanceProvider>
      </Provider>
    );
  }
}