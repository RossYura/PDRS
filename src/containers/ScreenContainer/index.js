import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  AppState,
  ImageBackground,
  Platform,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import compose from 'recompose/compose';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from 'services/navigation';

import {
  SCREEN_PADDING_HORIZONTAL,
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  SMALL_DEVICE_ANDROID,
  SCREEN_SCALE,
} from 'styles/metrics';
import Space from 'components/common/Space';
import ArrowBack from 'containers/RootNavigator/components/ArrowBack';
import colors from 'styles/colors';
import NetworkService from 'services/network';
import PermissionsRequestModal
  from 'components/common/modals/PermissionsRequestModal';
import { sleep } from 'utils/async';
import withTheme from 'HOCs/withTheme';
import withUser from 'HOCs/withUser';

class ScreenContainer extends React.Component {

  static defaultProps = {
    reloadWatchers: {},
    headerPadding: SCREEN_PADDING_HORIZONTAL,
    contentPadding: SCREEN_PADDING_HORIZONTAL,
    align: 'stretch',
    justify: 'flex-start',
    headerOffsetTop: 35,
    GradientProps: {},
    NavHeaderBackComponent: ArrowBack,
    headerPreserveStatusBarSpace: true,
    gradientPosition: 'absolute',
    gradientHeight: DEVICE_HEIGHT * 2 / 5,
    gradientColors: ['#0082AB', '#431377'],
    ScrollViewOverflowTopBGColor: colors._blue,
    ScrollViewOverflowTopSpinnerColor: '#ffffff',
  };

  constructor (props) {
    super(props);
    this.state = {
      loading: !!props.reloadHandler,
      appState: AppState.currentState,
      permissionModalVisible: false,
    };
  }

  handleStateChange = (payload) => this.setState({
    ...payload,
  });

  async componentDidMount () {
    const {
      reloadWatchers,
    } = this.props;

    const {
      pushTokenRefresh,
      pushNotificationsReload,
      pushNotificationsPermissionsAsk,
      appStateChangeReload,
      navigationInReload,
    } = reloadWatchers;

    if (pushTokenRefresh) {
      this.renewPushToken();
    }
    if (pushNotificationsReload && pushNotificationsReload.key) {
      this.subscribeToPushNotificationsReload();
    }
    if (pushNotificationsPermissionsAsk && !__DEV__) {
      this.askForPushNotificationsPermissions();
    }
    if (appStateChangeReload) {
      this.subscribeToAppStateChangeReload();
    }
    if (navigationInReload) {
      this.subscribeNavigationInReload();
    }
    await this.reload();
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange);
    this.notificationSubscription &&
    this.notificationSubscription.remove();
  }

  askForPushNotificationsPermissions = async () => {
    const { status } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    );

    if (status !== 'denied' && status !== 'granted') {
      setTimeout(() => {
        this.handleStateChange({ permissionModalVisible: true });
      }, 500);
    }
  };

  subscribeNavigationInReload = () => {
    NavigationService.navigatorRef.current.addListener(
      'didFocus',
      ({ state: { action, params } }) => {

        if (!this.state.loading) {
          this.reload();
        }
        // const navProps = action || params;
        // if (navProps && navProps.forceReload) {
        //   this.reload();
        // }
      },
    );
  };

  subscribeToPushNotificationsReload = async () => {
    const { status } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    );

    if (status === 'granted') {
      this.notificationSubscription = Notifications.addNotificationReceivedListener(this._handleNotification);
    }
  };

  _handleNotification = (notification) => {
    const {
      pushNotificationsReload: {
        key: reloadKey,
      } = {},
    } = this.props.reloadWatchers;

    const reloadKeys = [].concat(reloadKey);

    if (notification.data?.eventType && reloadKeys.some(key => notification.data.eventType.match(key))) {
      this.reload();
    }
  };

  subscribeToAppStateChangeReload = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  };

  _handleAppStateChange = async (nextAppState) => {
    const {
      appState,
    } = this.state;
    if (appState.match(/inactive|background/) && nextAppState ===
      'active') {
      await this.reload();
    }
    this.handleStateChange({ appState: nextAppState });
  };

  renewPushToken = async () => {
    const { status } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    );

    if (status === 'granted') {
      const {
        user: {
          id,
        },
      } = this.props;

      const pushToken = await Notifications.getExpoPushTokenAsync();

      NetworkService.User()
        .modifyUser(id, {
          pushToken,
        });
    }
  };

  reload = async () => {
    const {
      reloadHandler,
    } = this.props;

    if (reloadHandler) {
      this.handleStateChange({
        loading: true,
      });
      try {
        await Promise.all([
          reloadHandler(),
          sleep(250),
        ]);
        this.handleStateChange({
          loading: false,
        });
      } catch (error) {
        this.handleStateChange({
          loading: false,
        });
      }
    }
  };

  getLoadingState = () => this.state.loading || this.props.loading;

  componentDidUpdate (props) {
    const { scrollPosition } = props;

    if (typeof (scrollPosition) === 'number') {
      //scroll for android
      if (Platform.OS === 'android' && scrollPosition > 1100) {
        let scrollY = SMALL_DEVICE_ANDROID ? 1500 : 1200;
        this.scrollView.scrollTo({ y: scrollY, animated: true });
      }

      //scroll for return to start in feeds
      if (scrollPosition === 0) {
        this.scrollView.scrollTo({
          y: scrollPosition,
          animated: true,
        });
      }
    }
  }

  isContainerComponentDraggable = () => {
    const { ContainerComponent: ContainerComponentOrigin, reloadHandler } = this.props;

    const ContainerComponent = ContainerComponentOrigin || (
      reloadHandler
        ? ScrollView
        : View
    );

    return ContainerComponent === ScrollView
      || ContainerComponent.name === 'KeyboardAwareScrollView'
      || ContainerComponent === KeyboardAwareScrollView;
  };

  render () {
    const {
      getContainerProps,
      headerPadding = SCREEN_PADDING_HORIZONTAL,
      contentPadding = SCREEN_PADDING_HORIZONTAL,
      align,
      justify,
      statusBarProps,
      children,
      headerOffsetTop,
      contentOffsetTop,
      GradientProps,
      navHeader,
      NavHeaderBackComponent,
      navHeaderShade,
      navHeaderBackHandler,
      navHeaderContent,
      overlayButton,
      header,
      headerPreserveStatusBarSpace,
      gradientPosition,
      gradientHeight,
      ScrollViewOverflowTopBGColor: ScrollViewOverflowTopBGColorOrigin,
      reloadHandler,
      ScrollViewOverflowTopSpinnerColor: ScrollViewOverflowTopSpinnerColorOrigin,
      reloadWatchers,
      ContainerComponent: ContainerComponentOrigin,
      ContainerComponentProps: ContainerComponentPropsOrigin = {},
      gradientBanner,
      gradientColors,
    } = this.props;

    const {
      pushNotificationsPermissionsAsk,
    } = reloadWatchers;

    const { permissionModalVisible } = this.state;

    const ContainerComponent = ContainerComponentOrigin || (
      reloadHandler
        ? ScrollView
        : View
    );

    const ContainerComponentProps = {
      ...ContainerComponentPropsOrigin,
      ...reloadHandler
        ? {
          refreshControl: (
            <RefreshControl
              refreshing={false}
              onRefresh={this.reload}
              tintColor='#ffffff'
            />
          ),
        }
        : {},
    };

    const ScrollViewOverflowTopBGColor = gradientBanner
      ? '#ffffff'
      : ScrollViewOverflowTopBGColorOrigin;

    const ScrollViewOverflowTopSpinnerColor = gradientBanner
      ? 'gray'
      : ScrollViewOverflowTopSpinnerColorOrigin;

    if (getContainerProps) {
      getContainerProps({
        reload: this.reload,
        loading: this.getLoadingState(),
      });
    }

    return (
      <View
        style={styles.saveAreaWrapper}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
          {...statusBarProps}
        />
        {
          navHeader && (
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  top: Constants.statusBarHeight + 10,
                  left: 16,
                  right: 16,
                  zIndex: 9999,
                  overflow: 'visible',
                },
              ]}
            >
              {
                navHeaderShade && (
                  <LinearGradient
                    colors={['rgba(0,0,0,0.9)', 'transparent']}
                    style={{
                      position: 'absolute',
                      left: -16,
                      right: -16,
                      top: -Constants.statusBarHeight - 10,
                      bottom: -16,
                    }}
                  />
                )
              }
              <NavHeaderBackComponent onPress={navHeaderBackHandler}/>
              <Space horizontal size={16}/>
              {
                navHeaderContent
              }
            </View>
          )
        }
        <ContainerComponent
          style={styles.saveAreaWrapper}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          {...ContainerComponentProps}
          scrollIndicatorInsets={{ right: 1 }}
          ref={(ref) => { this.scrollView = ref; }}
        >
          {
            this.isContainerComponentDraggable() && (
              <View
                style={{
                  position: 'absolute',
                  top: -DEVICE_HEIGHT * 2 / 3,
                  height: DEVICE_HEIGHT * 2 / 3,
                  left: 0,
                  right: 0,
                  backgroundColor: ScrollViewOverflowTopBGColor,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingBottom: 30,
                  zIndex: 888,
                }}
              >
                {
                  reloadHandler && (
                    <ActivityIndicator
                      style={{ zIndex: 99999 }}
                      size="large"
                      color={ScrollViewOverflowTopSpinnerColor}
                    />
                  )
                }
              </View>
            )
          }
          <View style={{ height: Constants.statusBarHeight }}/>
          <View
            style={[
              styles.gradient,
              {
                position: gradientPosition,
                left: -50,
                width: DEVICE_WIDTH + 100,
                overflow: 'hidden',
                height: gradientHeight,
              },
              GradientProps.style,
            ]}
          >
            {
              gradientBanner
                ? (
                  <ImageBackground
                    source={{ uri: gradientBanner }}
                    resizeMode="cover"
                    style={{
                      marginHorizontal: -2,
                      flex: 1,
                      paddingHorizontal: headerPadding,
                      paddingTop: headerPreserveStatusBarSpace
                        ? Constants.statusBarHeight + headerOffsetTop
                        : headerOffsetTop,
                    }}
                  >
                    {header}
                  </ImageBackground>
                ) : (
                  <LinearGradient
                    colors={gradientColors}
                    style={{
                      flex: 1,
                      overflow: 'hidden',
                      paddingHorizontal: headerPadding + 50,
                    }}
                  >
                    <View
                      style={{
                        paddingHorizontal: headerPadding,
                        paddingTop: headerPreserveStatusBarSpace
                          ? Constants.statusBarHeight + headerOffsetTop
                          : headerOffsetTop,
                      }}
                    >
                      {header}
                    </View>
                  </LinearGradient>
                )
            }
          </View>
          <View
            style={{
              paddingHorizontal: contentPadding,
              alignItems: align,
              justifyContent: justify,
              width: DEVICE_WIDTH,
              flex: 1,
              marginTop: contentOffsetTop === undefined
                ? (gradientHeight - 50)
                : contentOffsetTop,
            }}
          >
            {
              this.getLoadingState()
                ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: DEVICE_HEIGHT
                        - (
                          contentOffsetTop === undefined
                            ? (gradientHeight - 50)
                            : contentOffsetTop
                        )
                        - 100 - Constants.statusBarHeight,
                    }}
                  >
                    <ActivityIndicator size="large"/>
                  </View>
                )
                : children
            }
          </View>
        </ContainerComponent>
        <PermissionsRequestModal
          visible={permissionModalVisible}
          onSubmit={() => {
            const {
              reloadWatchers: {
                pushNotificationsReload,
              },
            } = this.props;

            this.renewPushToken();
            if (!this.notificationSubscription && pushNotificationsReload && pushNotificationsReload.key) {
              this.subscribeToPushNotificationsReload();
            }
          }}
          onCancel={() => this.handleStateChange({
            permissionModalVisible: false,
          })}
          tip={pushNotificationsPermissionsAsk
            ? pushNotificationsPermissionsAsk.tip
            : null}
        />
        {
          overlayButton
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    top: 0,
    flex: 1,
    borderBottomLeftRadius: (600 + DEVICE_WIDTH) / 4,
    borderBottomRightRadius: (600 + DEVICE_WIDTH) / 4,
  },
  saveAreaWrapper: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
});

export default compose(
  withUser,
  withTheme.describe({
    dark: props => ({
      ContainerComponentProps: {
        ...props.ContainerComponentProps,
        style: {
          ...styles.saveAreaWrapper,
          backgroundColor: colors.deepblack,
        },
      },
    }),
  }),
)(ScreenContainer);
