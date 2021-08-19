import React from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import SvgUri from 'expo-svg-uri';
import compose from 'recompose/compose';

import ScreenContainer from 'containers/ScreenContainer';
import headerLogoIcon from 'assets/images/header_logo.svg';
import { 
  DEVICE_HEIGHT,
  SMALL_DEVICE_ANDROID,
} from 'styles/metrics';
import { isSmallGradient } from 'utils/common';
import Space from 'components/common/Space';
import {
  enableLoader,
  disableLoader,
  showModal,
  hideModal,
} from 'redux/common/actions';
import Text from 'components/common/Text';
import withUser from 'HOCs/withUser';
import HelpButton from 'components/common/modals/Help';
import SettingsButton from './components/SettingsButton';
import DynamicButton from './components/DynamicButton';
import people1Icon from 'assets/images/people1.svg';
import people2Icon from 'assets/images/people2.svg';
import NetworkService from 'services/network';
import StorageService from 'services/storage';
import Button from 'components/common/Button';
import colors from 'styles/colors';
import AppVersion from './components/AppVersion';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';
import { conditionalSwitch } from 'utils/common';
import FAB from 'components/common/modals/FAB';

const UserButton = SMALL_DEVICE_ANDROID ? DynamicButton : SettingsButton;

class PreferencesPasswordScreen extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      defaultInvestmentEntity: props.user.defaultInvestmentEntity,
    };
  }

  handleDefaultEntityChange = entityId => () => {
    const { user } = this.props;

    if (entityId !== user.defaultInvestmentEntity) {
      NetworkService.User()
        .code200(res => {
          StorageService.User.put(res.data.user);
          this.setState({
            defaultInvestmentEntity: res.data.user.defaultInvestmentEntity,
          });
        })
        .modifyUser(user.id, {
          defaultInvestmentEntity: entityId,
        });
    }
  };

  static entitiesMap = [
    {
      key: 'natural_person',
      getLabel: () => 'Natural Person',
      icon: people1Icon,
    },
    {
      key: 'legal_entity',
      getLabel: (entity) => entity.name,
      icon: people2Icon,
    },
  ];

  static GRADIENT_HEIGHT = conditionalSwitch(
    {
      condition: isSmallGradient('ios', 550),
      result: 550,
    },
    {
      condition: SMALL_DEVICE_ANDROID,
      result: 500,
    },
    {
      condition: conditionalSwitch.CONDITIONS.DEFAULT,
      result: DEVICE_HEIGHT * 3 / 4,
    }
  );

  render () {
    const { defaultInvestmentEntity } = this.state;
    const { GRADIENT_HEIGHT } = this.constructor;
    const { navigation, user } = this.props;

    const { investmentEntities } = user;

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
        header={
          <View style={{ alignItems: 'center' }}>
            <SvgUri source={headerLogoIcon} width={25} height={34}/>
            <Space size={5}/>
            <Text
              fontSize={42}
              color="#ffffff"
            >
              Account
            </Text>
            <Space size={5}/>
            <Text
              bold
              color="#ffffff"
            >
              Legal settings
            </Text>
            <Space size={30}/>
            <Text
              bold
              color="#ffffff"
            >
              Change default investor entity
            </Text>
            <Space size={20}/>
            {
              investmentEntities.map((entity, index) => {
                const uiEntityEntry = this.constructor.entitiesMap.find(
                  entry => entry.key === entity.entityType);

                return (
                  <UserButton
                    onPress={this.handleDefaultEntityChange(entity.id)}
                    inactive={defaultInvestmentEntity !== entity.id}
                    key={entity.id}
                    text={uiEntityEntry.getLabel(entity)}
                    icon={uiEntityEntry.icon}
                    style={{
                      marginBottom: index === investmentEntities.length - 1
                        ? 0
                        : 10,
                    }}
                  />
                );
              })
            }
          </View>
        }
      >
        <Button
          type="secondary"
          text="Back"
          loaderKey="passwordResetting"
          onPress={() => navigation.goBack()}
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
};

export default compose(
  connect(null, mapDispatchToProps),
  withUser,
  ensureAndroidCloseButton,
)(PreferencesPasswordScreen);