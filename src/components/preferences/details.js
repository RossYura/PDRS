import React from 'react';
import {
  View,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import SvgUri from 'expo-svg-uri';
import compose from 'recompose/compose';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
import {
  putUser,
} from 'redux/user/actions';
import Text from 'components/common/Text';
import TextInput from 'components/welcome/auth/components/Input';
import withUser from 'HOCs/withUser';
import NetworkService from 'services/network';
import Button from 'components/common/Button';
import HelpButton from 'components/common/modals/Help';
import styles from './styles';
import PhoneInput from './components/PhoneInput';
import validate, { rules } from 'lib/validator';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';
import AppVersion from './components/AppVersion';
import { conditionalSwitch } from 'utils/common';
import FAB from '../common/modals/FAB';
import FABMaskContainer from '../../containers/common/FABContainer';

class PreferencesDetailsScreen extends React.Component {

  static initialStatePartial = {
    newEmail: '',
    repeatEmail: '',
    password: '',
    androidKeyboardMargin: 0,
  };

  constructor (props) {
    super(props);
    const { phoneNumber, email, addressStreetAddress } = props.user;

    this.state = {
      email,
      phoneNumber,
      addressStreetAddress,
      ...this.constructor.initialStatePartial,
    };
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = () => {
    if (Platform.OS === 'android') {
      this.setState({ androidKeyboardMargin: -140 });
    }
  };

  _keyboardDidHide = () => {
    this.setState({ androidKeyboardMargin: 0 });
  };

  handleStateChange = stateKey => value => this.setState({
    [stateKey]: value,
  });

  wasChangesMade = () => {
    const { phoneNumber, newEmail, addressStreetAddress, password } = this.state;
    const { user } = this.props;

    return (phoneNumber !== user.phoneNumber ||
      (newEmail && newEmail !== user.email) ||
      addressStreetAddress !== user.addressStreetAddress) && password;
  };

  getChangedUserFormValues = () => {
    const { phoneNumber, newEmail, addressStreetAddress } = this.state;
    const { user } = this.props;

    return [
      {
        key: 'phoneNumber',
        value: phoneNumber,
        condition: user.phoneNumber !== phoneNumber,
      },
      {
        key: 'email',
        value: newEmail,
        condition: newEmail && (user.email !== newEmail),
      },
      {
        key: 'addressStreetAddress',
        value: addressStreetAddress,
        condition: user.addressStreetAddress !== addressStreetAddress,
      },
    ].reduce((res, group) => {

      if (group.condition) {
        return {
          ...res,
          [group.key]: group.value,
        };
      } else {
        return res;
      }
    }, {});
  };

  handleSubmit = async () => {
    const { newEmail, password, email, repeatEmail } = this.state;
    const { user, putUser } = this.props;

    const error = validate(
      {
        condition: !password,
        error: 'Password is required.',
      },
      {
        condition: newEmail && newEmail === email,
        error: 'New email should be different from old one.',
      },
      {
        condition: newEmail && !rules.email(newEmail),
        error: 'Check email format',
      },
      {
        condition: newEmail && newEmail !== repeatEmail,
        error: 'Repeat email should match.',
      },
    );

    if (error) {
      showMessage({
        message: error,
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    } else {
      await NetworkService.User()
        .code200(async ({ data: { user } }) => {
          const { email, phoneNumber, addressStreetAddress } = user;

          showMessage({
            message: 'Profile Updated',
            type: 'success',
            floating: true,
            duration: 3000,
          });

          putUser({ email, phoneNumber, addressStreetAddress });

          this.setState({
            email,
            phoneNumber,
            addressStreetAddress,
            ...this.constructor.initialStatePartial,
          });
        })
        .err(error => {
          showMessage({
            message: error.response.data.error,
            type: 'warning',
            floating: true,
            duration: 3000,
          });
        })
        .withLoaderKey('detailsChanging')
        .modifyUserProtected(
          user.id,
          password,
          this.getChangedUserFormValues(),
        );
    }
  };

  getMarginForSpace = (margin) => {
    if (this.state.androidKeyboardMargin) {
      return 2;
    }

    return margin;
  };

  static GRADIENT_HEIGHT = conditionalSwitch(
    {
      condition: isSmallGradient('ios', 650),
      result: 650,
    },
    {
      condition: SMALL_DEVICE_ANDROID,
      result: DEVICE_HEIGHT * 0.955,
    },
    {
      condition: conditionalSwitch.CONDITIONS.DEFAULT,
      result: DEVICE_HEIGHT * 3 / 4,
    },
  );

  static CONTENT_HEIGHT = conditionalSwitch(
    {
      condition: Platform === 'ios',
      result: this.GRADIENT_HEIGHT + 56,
    },
    {
      condition: SMALL_DEVICE_ANDROID,
      result: this.GRADIENT_HEIGHT + 96,
    },
    {
      condition: conditionalSwitch.CONDITIONS.DEFAULT,
      result: this.GRADIENT_HEIGHT + 76,
    },
  );

  render () {
    const { phoneNumber, email, newEmail, repeatEmail, password, addressStreetAddress } = this.state;
    const { GRADIENT_HEIGHT, CONTENT_HEIGHT } = this.constructor;
    const { navigation } = this.props;

    return (
      <FABMaskContainer
        TextProps={{
          fontSize: 14,
          textAlign: 'center',
        }}
      >
        <ScreenContainer
          navHeader
          navHeaderContent={(
            <HelpButton
              style={{
                top: 3,
              }}
            />
          )}
          align="center"
          gradientHeight={GRADIENT_HEIGHT}
          contentOffsetTop={this.state.androidKeyboardMargin}
          ContainerComponent={Platform.OS === 'ios' && KeyboardAwareScrollView}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              height: CONTENT_HEIGHT,
              paddingTop: 32,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <SvgUri source={headerLogoIcon} width={25} height={34}/>
              <Space size={5}/>
              <Text
                fontSize={42}
                color="#ffffff"
              >
                Account
              </Text>
              <Space size={25}/>
              <Text
                color="#ffffff"
                fontSize={15}
              >
                Change contact details
              </Text>

              <Space size={17}/>

              <PhoneInput
                value={phoneNumber}
                style={styles.phoneInput}
                textStyle={styles.phoneInputText}
                returnKeyType="next"
                onChangePhoneNumber={this.handleStateChange('phoneNumber')}
                label="Phone Number"
              />
              <Space size={this.getMarginForSpace(10)}/>
              <TextInput
                onChangeText={this.handleStateChange('addressStreetAddress')}
                value={addressStreetAddress}
                label="Address"
                autoCapitalize='none'
              />
              <Space size={this.getMarginForSpace(30)}/>
              <TextInput
                editable={false}
                onChangeText={this.handleStateChange('email')}
                value={email}
                label="Current email"
                autoCapitalize='none'
              />
              <Space size={this.getMarginForSpace(10)}/>
              <TextInput
                onChangeText={this.handleStateChange('newEmail')}
                value={newEmail}
                label="New email"
                autoCapitalize='none'
              />
              <Space size={this.getMarginForSpace(10)}/>
              <TextInput
                onChangeText={this.handleStateChange('repeatEmail')}
                value={repeatEmail}
                label="Repeat New email"
                autoCapitalize='none'
              />
              <Space size={this.getMarginForSpace(10)}/>
              <Text
                fontSize={12}
                color="#ffffff"
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: 16,
                }}
              >
                Enter your password below:
              </Text>
              <Space size={this.getMarginForSpace(10)}/>
              <TextInput
                onChangeText={this.handleStateChange('password')}
                value={password}
                label="Password"
                secureTextEntry
                autoCapitalize='none'
              />
            </View>

            <Button
              type="secondary"
              disabled={!this.wasChangesMade()}
              loaderKey="detailsChanging"
              onPress={this.handleSubmit}
              loaderColor={colors._darkviolet}
              width={212}
              height={56}
              text="Save"
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
            <Space size={10}/>
          </ScrollView>

          <AppVersion
            style={{
              position: 'absolute',
              bottom: 5,
              right: 5,
            }}
          />
        </ScreenContainer>
      </FABMaskContainer>
    );
  }
}

const mapDispatchToProps = {
  enableLoader,
  disableLoader,
  showModal,
  hideModal,
  putUser,
};

export default compose(
  connect(null, mapDispatchToProps),
  withUser,
  ensureAndroidCloseButton,
)(PreferencesDetailsScreen);
