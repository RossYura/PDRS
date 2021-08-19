import React from 'react';
import { AppState, StyleSheet, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { StackActions, CommonActions } from '@react-navigation/native';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import * as Updates from 'expo-updates';

import NavigationService from 'services/navigation';
import PDFViewer from 'components/common/modals/PDFViewer';
import AppNavigator from './RootNavigator';
import TipModal from 'components/common/modals/TipModal';
import { showModal, hideModal } from 'redux/common/actions';
import { WelcomeSplash } from 'components/welcome/WelcomeSplash';
import { initializeDataProviders } from 'redux/common/actions';

class AppRoot extends React.Component {

  state = {
    appState: null,
    appUpdating: false,
  };

  componentDidMount () {
    this.props.initializeDataProviders();
    Notifications.addNotificationReceivedListener(this._handleNotification);
    Notifications.addNotificationReceivedListener(this._handleNotificationRedirectBackground);
    Updates.addListener(({ type }) => {
      if (type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        Updates.reloadAsync();
      }
    });
    AppState.addEventListener('change', nextAppState => {
      if (this.state.appState && this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        this.checkAppUpdate();
      }
      this.setState({ appState: nextAppState });
    });
  }

  checkAppUpdate = async () => {
    if (!__DEV__) {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          await Updates.fetchUpdateAsync();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  _handleNotificationRedirectBackground = notification => {
    if (notification.origin === 'selected') {
      this._handleNotificationRedirect(notification);
    }
  };

  _handleNotificationRedirect = notification => {

    if (notification.data && notification.data.redirect) {
      const redirectScheme = notification.data.redirect;
      NavigationService.ref.current?.dispatch(
        CommonActions.navigate({
          routeName: redirectScheme.switchScreen,
        }),
      );

      NavigationService.ref.current?.dispatch(
        CommonActions.reset({
          index: redirectScheme.stackPath.length - 1,
          actions: redirectScheme.stackPath.map(
            navOptions => CommonActions.navigate(navOptions),
          ),
          key: null,
        }),
      );
    }
  };

  _handleNotification = notification => {
    if (notification.data) {
      showMessage({
        message: notification.data.title,
        description: notification.data.body,
        type: notification.data.type,
        floating: true,
        duration: 4500,
        onPress: () => this._handleNotificationRedirect(notification),
      });
    }
  };

  render () {
    const { appUpdating } = this.state;

    return (
      <View style={styles.container}>
        {
          appUpdating
            ? (
              <WelcomeSplash/>
            )
            : (
              <>
                <AppNavigator/>
                <PDFViewer/>
                <TipModal/>
                <FlashMessage
                  position="top"
                />
              </>
            )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default compose(
  connect(
    null,
    {
      showModal,
      hideModal,
      initializeDataProviders,
    },
  ),
)(AppRoot);