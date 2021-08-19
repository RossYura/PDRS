import React from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import SvgUri from 'expo-svg-uri';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import compose from 'recompose/compose';

import { signupUser } from 'redux/user/actions';
import { showModal } from 'redux/common/actions';
import { UserSelectors } from 'redux/selectors';
import colors from 'styles/colors';
import Button from 'components/common/Button';
import SwitchWithText from 'components/common/SwitchInput';
import Link from 'components/common/NavLink';
import { enableLoader, disableLoader } from 'redux/common/actions';
import ScreenContainer from 'containers/ScreenContainer';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from 'styles/metrics';
import Space from 'components/common/Space';
import headerLogoIcon from 'assets/images/header_logo.svg';
import TextInput from './components/Input';
import Text from 'components/common/Text';
import { rules } from 'lib/validator';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';

class SignUp extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      isTermsAccepted: false,
    };
  }

  isFormValid = () => [
    rules.email(this.state.email),
    this.state.password.length >= 6,
    this.state.passwordConfirmation.length >= 6,
    this.state.isTermsAccepted,
  ].every(condition => condition);

  handleSignupSubmit = async () => {
    const { email, password } = this.state;
    try {
      this.props.enableLoader('authSubmitting');
      await this.props.signupUser({ email, password });
      this.props.navigation.navigate('App', { from: 'signup' });
      this.props.disableLoader('authSubmitting');
    } catch (error) {
      this.props.disableLoader('authSubmitting');
      showMessage({
        message: 'Sign Up Failed',
        description: 'We have been notified, please try again',
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    }
  };

  static GRADIENT_HEIGHT = DEVICE_HEIGHT * 2 / 3 < 530 ? 530 : DEVICE_HEIGHT *
    2 / 3;

  render () {
    const { showModal } = this.props;
    const { GRADIENT_HEIGHT } = this.constructor;

    return (
      <ScreenContainer
        justify="space-between"
        align="center"
        gradientHeight={GRADIENT_HEIGHT}
        contentOffsetTop={GRADIENT_HEIGHT - 70}
        navHeader
        ContainerComponent={KeyboardAwareScrollView}
        ContainerComponentProps={{
          extraScrollHeight: 65,
          contentContainerStyle: {
            flex: 1,
            paddingBottom: 40
          }
        }}
        header={
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <SvgUri source={headerLogoIcon} width={25} height={34}/>
            <Space size={50}/>
            <Text
              fontSize={42}
              color="#ffffff"
            >
              Sign Up
            </Text>
            <Space size={20}/>
            <TextInput
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              label="Email Address"
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType="email-address"
              returnKeyType="next"
            />
            <Space size={22}/>
            <TextInput
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              label="Password"
              secureTextEntry
              autoCapitalize='none'
            />
            <Space size={22}/>
            <TextInput
              onChangeText={(passwordConfirmation) => this.setState(
                { passwordConfirmation })}
              value={this.state.passwordConfirmation}
              label="Confirm Password"
              secureTextEntry
              autoCapitalize='none'
            />
            <Space size={20}/>
            <SwitchWithText
              containerStyles={{
                maxWidth: 311,
                width: DEVICE_WIDTH - 64,
              }}
              onValueChange={isTermsAccepted => this.setState(
                { isTermsAccepted })}
              value={this.state.isTermsAccepted}
              text={(
                <Text
                  fontSize={14}
                  color="#ffffff"
                >
                  I accept the
                  {' '}
                  <Link
                    simpleText
                    onPress={() => showModal(
                      'pdfViewer',
                      {
                        local: true,
                        html: require('assets/contracts/terms_of_use.html'),
                        pdf: require('assets/contracts/terms_of_use.pdf')
                      },
                    )
                    }
                  >
                    Pitchdrive Terms of Use
                  </Link>
                  {' '}
                  and
                  {' '}
                  <Link
                    simpleText
                    onPress={() => showModal(
                      'pdfViewer',
                      {
                        local: true,
                        html: require('assets/contracts/privacy_policy.html'),
                        pdf: require('assets/contracts/privacy_policy.pdf')
                      },
                    )
                    }
                  >
                    Privacy Policy
                  </Link>
                  .
                </Text>
              )}
            />
          </View>
        }
      >
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="secondary"
            text="Continue"
            loaderKey="authSubmitting"
            onPress={this.handleSignupSubmit}
            disabled={!this.isFormValid()}
            loaderColor={colors._darkviolet}
            width={212}
            height={56}
            style={{elevation: 2, borderColor: 'transparent'}}
          />
          <Space size={15}/>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Text>
              Already have an account?
            </Text>
            <Space size={10}/>
            <Link
              to="SignIn"
              style={{
                color: '#3D708E',
              }}
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScreenContainer>
    );
  }
}

const mapDispatchToProps = {
  signupUser,
  showModal,
  enableLoader,
  disableLoader,
};

const mapStateToProps = state => ({
  loading: UserSelectors.loading(state),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ensureAndroidCloseButton,
)(SignUp);
