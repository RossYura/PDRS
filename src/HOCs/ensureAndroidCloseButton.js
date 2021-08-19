import React from 'react';
import { BackHandler } from 'react-native';

const backNavigationPages = [
  'ChipInAmount',
  'PreferencesPassword',
  'PreferencesDetails',
  'PreferencesLegalEntities',
  'SignIn',
  'SignUp',
  'ForgotPassword',
];

const ensureAndroidCloseButton = Component => class AndroidCloseButtonComponent extends React.Component {
  componentDidMount () {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  componentWillUnmount () {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    const { navigation, route } = this.props;

    if (backNavigationPages.includes(route.name)) {
      navigation.goBack(null);
      if (navigation.state && route.params) {
        route.params.reloadHandler();
      }
    } else {
      BackHandler.exitApp();
    }

    return true;
  };

  render () {
    return <Component {...this.props}/>;
  }
};

export default ensureAndroidCloseButton;
