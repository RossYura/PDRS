import React from 'react';
import { Image, View, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import SvgUri from 'expo-svg-uri';

import Text from 'components/common/Text';
import styles from './styles';
import successImage from 'assets/images/success_new.png';
import ScreenContainer from 'containers/ScreenContainer';
import Link from 'components/common/NavLink';
import colors from 'styles/colors';
import { getUserProfileStatus } from 'redux/user/actions';
import PushNotificationsPermissionTipPartial
  from './components/PushPermissionsTipPartial';
import { USER_APPROVED } from 'static/constants/notificationsKeys';
import headerLogoIcon from 'assets/images/header_logo.svg';
import { DEVICE_HEIGHT } from 'styles/metrics';
import Space from 'components/common/Space';
import withUser from 'HOCs/withUser';

const GRADIENT_HEIGHT = DEVICE_HEIGHT / 2;

const ProcessingScreen = ({ getUserProfileStatus, user }) => (
  <ScreenContainer
    gradientHeight={GRADIENT_HEIGHT}
    contentOffsetTop={GRADIENT_HEIGHT / 2}
    paddingHorizontal={0}
    header={
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <SvgUri source={headerLogoIcon}/>
        <Space size={20}/>
        <Text
          fontSize={22}
          color="#ffffff"
        >
          PITCHDRIVE
        </Text>
      </View>
    }
    reloadHandler={
      async () => {
        const { id } = user;
        getUserProfileStatus(id);
      }
    }
    reloadWatchers={{
      pushTokenRefresh: true,
      pushNotificationsReload: {
        key: USER_APPROVED,
      },
      pushNotificationsPermissionsAsk: {
        tip: PushNotificationsPermissionTipPartial,
      },
    }}
  >
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <Image source={successImage} style={styles.logo2} resizeMode='contain'/>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Text style={styles.description_nodata}>
          Swipe down to check for updates
        </Text>
        <FontAwesome
          name="angle-double-down"
          size={30}
          style={{
            color: colors.black,
          }}
        />
        <View style={{ height: 10 }}/>
        <Text style={styles.title}>
          Thanks for signing up!{'\n'}
          Due to the high demand to access our platform we’re currently only
          selecting a limited pool of investors. We will investigate your
          profile and contact you within 24 hours.{'\n'}
          Cant wait to see pitchers? Check out some alumni stories on{' '}
          <Link
            simpleText
            to="WebViewer"
            params={{
              href: 'https://pitchdrive.com/',
              webViewerPassedProps: {
                goBackUrl: 'Processing',
              },
            }}
            style={{
              fontSize: 20,
            }}
          >
            pitchdrive.com
          </Link>
        </Text>
      </ScrollView>
    </View>
  </ScreenContainer>
);

const mapDispatchToProps = { getUserProfileStatus };

export default compose(
  withUser,
  connect(
    null,
    mapDispatchToProps,
  ),
)(ProcessingScreen);