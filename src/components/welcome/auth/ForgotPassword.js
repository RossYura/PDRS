import React from 'react';
import {
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import SvgUri from 'expo-svg-uri';
import compose from 'recompose/compose';

import { UserActions } from 'redux/actions';
import { UserSelectors } from 'redux/selectors';
import ScreenContainer from 'containers/ScreenContainer';
import { DEVICE_HEIGHT } from 'styles/metrics';
import Space from 'components/common/Space';
import headerLogoIcon from 'assets/images/header_logo.svg';
import Button from 'components/common/Button';
import TextInput from './components/Input';
import Text from 'components/common/Text';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  handleSubmit = async () => {
    try {
      await this.props.forgotPassword(this.state);
      showMessage({
        message: 'Success',
        description: 'If this address exists you will receive an email with reset instructions',
        type: 'success',
        floating: true,
        duration: 3000,
      });
      this.setState({ email: '' });
    } catch (error) {
      showMessage({
        message: 'Oops, something went wrong!',
        description: 'We have been notified, please try again',
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    }
  };

  validateEmail = () => {
    // eslint-disable-next-line no-useless-escape
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email)
      .toLowerCase());
  };

  formInvalid = () => {
    return (
      !this.validateEmail()
    );
  };

  render() {
    return (
      <ScreenContainer
        navHeader
        gradientHeight={DEVICE_HEIGHT + 100}
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
              Forgot Password
            </Text>
            <Space size={50}/>
            <TextInput
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              label="Email Address"
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType="email-address"
              returnKeyType="next"
            />
            <Space size={40}/>
            <Button
              type="secondary"
              text="Continue"
              loaderKey="authSubmitting"
              onPress={this.handleSubmit}
              disabled={this.formInvalid()}
              width={212}
              height={56}
              style={{
                elevation: 2, 
                borderColor: 'transparent'
              }}
            />
          </View>
        }
      />
    );
  }
}

let mapDispatchToProps = {
  ...UserActions,
};
let mapStateToProps = state => ({
  loading: UserSelectors.loading(state),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ensureAndroidCloseButton,
)(ForgotPassword);