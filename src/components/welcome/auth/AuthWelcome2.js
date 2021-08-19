import React from 'react';
import { 
  TouchableOpacity, 
  View,
  Platform, } from 'react-native';
import SvgUri from 'expo-svg-uri';

import Text from 'components/common/Text';
import Button from 'components/common/Button';
import { DEVICE_HEIGHT } from 'styles/metrics';
import ScreenContainer from 'containers/ScreenContainer';
import Space from 'components/common/Space';
import colors from 'styles/colors';
import headerLogoIcon from 'assets/images/header_logo.svg';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';

const GRADIENT_HEIGHT = DEVICE_HEIGHT * 2 / 3 < 500 
  && Platform.OS === 'ios' 
  ? 500 
  : DEVICE_HEIGHT * 2 / 3;

const AuthWelcome2 = ({ navigation }) => (
  <ScreenContainer
    justify="space-between"
    gradientHeight={GRADIENT_HEIGHT}
    contentOffsetTop={GRADIENT_HEIGHT - 70}
    header={
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <SvgUri source={headerLogoIcon}/>
        <Space size={80}/>
        <Text
          fontSize={42}
          color="#ffffff"
        >
          Ready to join?
        </Text>
      </View>
    }
  >
    <View
      style={{
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Button
        type="secondary"
        text="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
        width={212}
        height={56}
        style={{
          elevation: 2, 
          borderColor: 'transparent'
        }}
      />
      <Space size={21}/>
      <Button
        type="secondaryBordered"
        text="Sign In"
        onPress={() => navigation.navigate('SignIn')}
        width={212}
        height={56}
      />
      <Space size={15}/>
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text
          color={colors._darkviolet}
          fontSize={15}
          textAlign="center"
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <Space size={30}/>
    </View>
  </ScreenContainer>
);

export default ensureAndroidCloseButton(AuthWelcome2);