import React from 'react';
import { 
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import SvgUri  from 'expo-svg-uri';

import Text from 'components/common/Text';
import styles from './styles';
import Button from 'components/common/Button';
import {
  DEVICE_HEIGHT,
  SMALL_DEVICE_ANDROID,
} from 'styles/metrics';
import ScreenContainer from 'containers/ScreenContainer';
import Space from 'components/common/Space';
import colors from 'styles/colors';
import headerLogoIcon from 'assets/images/header_logo.svg';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';
import swipeIcon from 'assets/images/swipe_left.svg';

const GRADIENT_HEIGHT = DEVICE_HEIGHT * 2 / 3 < 500
  && Platform.OS === 'ios'
  ? 500
  : DEVICE_HEIGHT * 2 / 3;

const AuthWelcome = ({ navigation }) => (
  <ScreenContainer
    backgroundHeader
    justify="space-between"
    gradientHeight={GRADIENT_HEIGHT}
    contentOffsetTop={GRADIENT_HEIGHT - 70}
    header={
      <View
        style={{
          alignItems: 'center'
        }}
      >
        <SvgUri source={headerLogoIcon}/>
        <Space size={SMALL_DEVICE_ANDROID ? 80 : 125} />
        <Text
          fontSize={22}
          color="#ffffff"
        >
          Welcome to
        </Text>
        <Space size={17} />
        <Text
          fontSize={40}
          color="#ffffff"
        >
          PITCHDRIVE
        </Text>
        <Space size={5}/>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Swipe to learn more
          </Text>
          <SvgUri
            source={swipeIcon}
            width={35}
            height={35}
          />
        </View>
        <Space size={25}/>
      </View>
    }
  >
    <View
      style={{
        alignItems: 'center',
        flex: 1
      }}
    >
      <Button
        type="secondary"
        text="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
        width={212}
        height={56}
        style={{elevation: 2, borderColor: 'transparent'}}
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
    </View>
  </ScreenContainer>
);

export default ensureAndroidCloseButton(AuthWelcome);