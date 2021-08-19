import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SvgUri from 'expo-svg-uri';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import compose from 'recompose/compose';

import { loginUser } from 'redux/user/actions';
import { UserSelectors } from 'redux/selectors';
import Button from 'components/common/Button';
import { enableLoader, disableLoader } from 'redux/common/actions';
import TextInput from './components/Input';
import ScreenContainer from 'containers/ScreenContainer';
import { DEVICE_HEIGHT } from 'styles/metrics';
import Space from 'components/common/Space';
import headerLogoIcon from 'assets/images/header_logo.svg';
import colors from 'styles/colors';
import Text from 'components/common/Text';
import Link from 'components/common/NavLink';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';

class SignIn extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  validateEmail = () => {
    //eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email)
      .toLowerCase());
  };

  formInvalid = () => {
    return (
      !this.validateEmail() || this.state.password.length < 6
    );
  };

  handleLoginSubmit = async () => {
    this.props.loginUser({
      ...this.state,
    });
  };

  static GRADIENT_HEIGHT = DEVICE_HEIGHT * 2 / 3 < 500
    ? 500
    : DEVICE_HEIGHT * 2 / 3;

  render () {
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
          extraScrollHeight: 75,
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
              Sign In
            </Text>
            <Space size={50}/>
            <TextInput
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              label="Email Address"
              autoCapitalize='none'
              keyboardType="email-address"
            />
            <Space size={22}/>
            <TextInput
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              label="Password"
              secureTextEntry={true}
              autoCapitalize='none'
            />
            <Space size={10}/>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPassword')}
            >
              <Text
                color="#ffffff"
                fontSize={15}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
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
            onPress={this.handleLoginSubmit}
            disabled={this.formInvalid()}
            width={212}
            height={56}
            loaderColor={colors._darkviolet}
            style={{
              elevation: 2, 
              borderColor: 'transparent'
            }}
          />
          <Space size={15}/>
          <View
            style={{
              alignItems: 'center',
              flex: 1
            }}
          >
            <Text>
              Don't have an account?
            </Text>
            <Space size={10}/>
            <Link
              to="SignUp"
              style={{
                color: '#3D708E',
              }}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScreenContainer>
    );
  }
}

const mapDispatchToProps = {
  enableLoader,
  disableLoader,
  loginUser,
};

const mapStateToProps = state => ({
  loading: UserSelectors.loading(state),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ensureAndroidCloseButton,
)(SignIn);
