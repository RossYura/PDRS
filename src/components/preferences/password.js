import React from 'react';
import {
  View,
  Platform,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import SvgUri from 'expo-svg-uri';
import compose from 'recompose/compose';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import ScreenContainer from 'containers/ScreenContainer';
import headerLogoIcon from 'assets/images/header_logo.svg';
import { 
  DEVICE_HEIGHT,
  SMALL_DEVICE_ANDROID,
} from 'styles/metrics';
import { isSmallGradient } from 'utils/common';
import colors from 'styles/colors';
import Space from 'components/common/Space';
import {
  enableLoader,
  disableLoader,
  showModal,
  hideModal,
} from 'redux/common/actions';
import { resetPassword } from 'redux/user/actions';
import Text from 'components/common/Text';
import TextInput from 'components/welcome/auth/components/Input';
import withUser from 'HOCs/withUser';
import Button from 'components/common/Button';
import HelpButton from 'components/common/modals/Help';
import validate from 'lib/validator';
import AppVersion from './components/AppVersion';
import NetworkService from 'services/network';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';
import { conditionalSwitch } from 'utils/common';
import FAB from 'components/common/modals/FAB';

class PreferencesPasswordScreen extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    };
  }

  getFormError = () => {
    const { currentPassword, newPassword, newPasswordConfirmation } = this.state;

    return validate(
      {
        condition: currentPassword.length < 6 || newPassword.length < 6 ||
          newPasswordConfirmation.length < 6,
        error: 'Password\'s should contain at least 6 characters',
      },
      {
        condition: currentPassword === newPassword,
        error: 'New password should be different',
      },
      {
        condition: newPasswordConfirmation !== newPassword,
        error: 'New password should match confirm password',
      },
    );
  };

  resetPassword = async () => {
    const error = this.getFormError();

    if (error) {
      showMessage({
        message: 'Incorrect Credentials Provided',
        description: error,
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    } else {
      NetworkService.User()
        .withLoaderKey('passwordResetting')
        .code200(({data}) => {
          this.setState({
            currentPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
          });

          showMessage({
            message: 'Password Update Successful',
            type: 'success',
            floating: true,
            duration: 3000,
          });

          this.props.resetPassword(data);
        })
        .invalidCredentials401(() => {
          showMessage({
            message: 'Couldn\'t Update Your Password',
            description: 'We have been notified, please try again',
            type: 'warning',
            floating: true,
            duration: 3000,
          });
        })
        .resetPassword({
          ...this.state,
          userEmail: this.props.user.email,
        });
    }
  };

  handlePasswordsInputChange = (stateKey) => (value) => {
    this.setState({
      [stateKey]: value,
    });
  };

  static GRADIENT_HEIGHT = conditionalSwitch(
    {
      condition: isSmallGradient('ios', 500),
      result: 500,
    },
    {
      condition: SMALL_DEVICE_ANDROID,
      result: DEVICE_HEIGHT * 0.7,
    },
    {
      condition: conditionalSwitch.CONDITIONS.DEFAULT,
      result: DEVICE_HEIGHT * 3 / 4,
    }
  );   

  wasChangesMade = () => {
    const { currentPassword, newPassword, newPasswordConfirmation } = this.state;

    return currentPassword && newPassword && newPasswordConfirmation;
  };

  render () {
    const { currentPassword, newPassword, newPasswordConfirmation } = this.state;
    const { GRADIENT_HEIGHT } = this.constructor;
    const { navigation } = this.props;

    return (
      <ScreenContainer
        align="center"
        gradientHeight={GRADIENT_HEIGHT}
        navHeader
        navHeaderContent={(
          <HelpButton
            style={{
              top: 3,
            }}
          />
        )}
        ContainerComponent={Platform.OS === 'ios' &&  KeyboardAwareScrollView}
        ContainerComponentProps={{
          automaticallyAdjustContentInsets: false
        }}
        header={
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <SvgUri source={headerLogoIcon} width={25} height={34}/>
            <Space size={5}/>
            <Text
              fontSize={42}
              color="#fff"
            >
              Account
            </Text>
            <Space size={25}/>
            <Text
              color="#fff"
              fontSize={15}
            >
              Change password
            </Text>
            <Space size={17}/>

            <TextInput
              onChangeText={this.handlePasswordsInputChange('currentPassword')}
              value={currentPassword}
              label="Current Password"
              secureTextEntry
              autoCapitalize='none'
            />
            <Space size={10}/>
            <TextInput
              onChangeText={this.handlePasswordsInputChange('newPassword')}
              value={newPassword}
              label="New Password"
              secureTextEntry
              autoCapitalize='none'
            />
            <Space size={10}/>
            <TextInput
              onChangeText={this.handlePasswordsInputChange(
                'newPasswordConfirmation')}
              value={newPasswordConfirmation}
              label="Repeat New Password"
              secureTextEntry
              autoCapitalize='none'
            />
          </View>
        }
      >
        <Button
          type="secondary"
          disabled={!this.wasChangesMade()}
          loaderKey="passwordResetting"
          onPress={this.resetPassword}
          loaderColor={colors._darkviolet}
          width={212}
          height={56}
          text="Save"
          style={{
            marginTop: (DEVICE_HEIGHT > 700) ? -30 : 0,
          }}
        />
        <Space size={10}/>
        <Button
          type="secondary"
          onPress={() => navigation.goBack()}
          loaderColor={colors._darkviolet}
          width={212}
          height={56}
          text="Back"
        />
        <AppVersion
          style={{
            position: 'absolute',
            bottom: 5,
            right: 5,
          }}
        />
        <FAB
          TextProps={{
            fontSize: 14,
            textAlign: 'center'
          }}
        />
      </ScreenContainer>
    );
  }
}

const mapDispatchToProps = {
  enableLoader,
  disableLoader,
  showModal,
  hideModal,
  resetPassword,
};

export default compose(
  connect(null, mapDispatchToProps),
  withUser,
  ensureAndroidCloseButton,
)(PreferencesPasswordScreen);