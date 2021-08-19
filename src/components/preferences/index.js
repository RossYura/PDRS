import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import SvgUri from 'expo-svg-uri';
import compose from 'recompose/compose';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import StorageService from 'services/storage';
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
import { logoutUser } from 'redux/user/actions';
import Text from 'components/common/Text';
import TextInput from 'components/welcome/auth/components/Input';
import EditableAvatar from 'components/common/EditableAvatar';
import withUser from 'HOCs/withUser';
import editIcon from 'assets/images/edit.svg';
import detailsIcon from 'assets/images/details.svg';
import keyIcon from 'assets/images/key.svg';
import NetworkService from 'services/network';
import { getFileNameFromUrl } from 'utils/string';
import HelpButton from 'components/common/modals/Help';
import Button from 'components/common/Button';
import SettingsButton from './components/SettingsButton';
import balanceIcon from 'assets/images/balance.svg';
import AppVersion from './components/AppVersion';
import ensurePreload from 'HOCs/ensureProps';
import { conditionalSwitch } from 'utils/common';
import FAB from '../common/modals/FAB';

class PreferencesMainScreen extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      bio: props.user.bio,
    };
  }

  handleLogoutSubmit = async () => {
    try {
      this.props.enableLoader('logOut');
      await this.props.logoutUser();
      this.props.disableLoader('logOut');
      showMessage({
        message: 'Sign Out Successful',
        type: 'success',
        floating: true,
        duration: 3700,
      });
    } catch (error) {
      this.props.disableLoader('logOut');
      if (error.response) {
        if (error.response.status === 401) {
          showMessage({
            message: 'Couldn\'t Authenticate You',
            description: 'Please sign in again',
            type: 'warning',
            floating: true,
            duration: 3000,
          });
          await StorageService.User.remove();
        } else {
          showMessage({
            message: 'Couldn\'t Sign Out',
            description: 'We have been notified, please try again',
            type: 'warning',
            floating: true,
            duration: 3000,
          });
        }
      }
    }
  };

  static GRADIENT_HEIGHT = conditionalSwitch(
    {
      condition: isSmallGradient('ios', 600),
      result: 600,
    },
    {
      condition: SMALL_DEVICE_ANDROID,
      result: DEVICE_HEIGHT * 0.8125,
    },
    {
      condition: conditionalSwitch.CONDITIONS.DEFAULT,
      result: DEVICE_HEIGHT * 3 / 5,
    },
  );

  render () {
    const { bio } = this.state;
    const { GRADIENT_HEIGHT } = this.constructor;
    const { user, navigation, showModal } = this.props;
    const spaceSize = SMALL_DEVICE_ANDROID ? 20 : 25;

    return (
      <ScreenContainer
        align="center"
        gradientHeight={GRADIENT_HEIGHT}
        ContainerComponent={Platform.OS === 'ios' && KeyboardAwareScrollView}
        ContainerComponentProps={{
          automaticallyAdjustContentInsets: false,
        }}
        navHeader
        NavHeaderBackComponent={() => null}
        navHeaderContent={(
          <HelpButton
            style={{
              top: 3,
            }}
          />
        )}
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
              color="#ffffff"
            >
              Account
            </Text>
            <Space size={13}/>
            <EditableAvatar
              width={70}
              height={70}
              borderRadius={35}
              firstName={user.firstName}
              lastName={user.lastName}
              source={user.avatar}
              onSubmit={(image) => {
                const fileName = getFileNameFromUrl(image.uri);

                NetworkService.User()
                  .code200(res => {
                    StorageService.User.put({
                      avatar: res.data.user.avatar,
                    });
                  })
                  .changeProfilePicture(user.id, {
                    base64: image.base64,
                    filename: fileName,
                  });
              }}
            />
            <Space size={13}/>
            <View>
              <TextInput
                multiline
                style={{
                  height: SMALL_DEVICE_ANDROID ? 70 : 100,
                }}
                placeholder="Update your bio here to tell startups a bit more about yourself as an investor. This is what startup founders will see when using your referral link"
                placeholderTextColor="#ffffff"
                onChangeText={(bio) => this.setState({ bio })}
                value={bio}
                label="Bio"
                autoCapitalize='none'
              />
              <TouchableOpacity
                onPress={async () => {
                  await NetworkService.User()
                    .modifyUser(user.id, {
                      bio,
                    });
                  await StorageService.User.put({
                    bio,
                  });
                  showModal('fab', { content: 'Bio Saved' });
                }}
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 3,
                }}
              >
                <SvgUri source={editIcon}/>
              </TouchableOpacity>
            </View>
            <Space size={spaceSize}/>
            <SettingsButton
              onPress={() => navigation.navigate('PreferencesPassword')}
              icon={keyIcon}
              text="Change password"
            />
            <Space size={spaceSize}/>
            <SettingsButton
              onPress={() => navigation.navigate('PreferencesDetails')}
              icon={detailsIcon}
              text="Change contact details"
            />
            <Space size={spaceSize}/>
            <SettingsButton
              onPress={() => navigation.navigate('PreferencesLegalEntities')}
              icon={balanceIcon}
              text="Legal settings"
            />
          </View>
        }
      >
        <Button
          type="secondaryBordered"
          text="Log Out"
          loaderKey="logOut"
          onPress={this.handleLogoutSubmit}
          loaderColor={colors._darkviolet}
          width={212}
          height={56}
          style={{
            marginTop: (DEVICE_HEIGHT > 700) ? -30 : 0,
          }}
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
            textAlign: 'center',
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
  logoutUser,
};

export default compose(
  connect(null, mapDispatchToProps),
  withUser,
  ensurePreload({
    requiredProps: ['user'],
  }),
)(PreferencesMainScreen);