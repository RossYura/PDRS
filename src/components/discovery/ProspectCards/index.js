import React from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ScreenContainer from 'containers/ScreenContainer';
import Text from 'components/common/Text';
import Space from 'components/common/Space';
import {
  getProspectSwitchStatus,
  getStartupMatches,
} from 'redux/startup/selectors';
import withUser from 'HOCs/withUser';
import { DEVICE_HEIGHT } from 'styles/metrics';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';
import ProspectDeckSwiper from './components/ProspectDeckSwiper';
import SwitchCustom from 'components/common/SwitchCustom';
import favoriteIcon from 'assets/images/favorite.svg';
import magnifyingGlassIcon from 'assets/images/magifying_glass.svg';
import colors from 'styles/colors';
import { toggleProspectSwitch } from 'redux/startup/actions';

const ProspectCards = ({ navigation, matches, toggleProspectSwitch, prospectSwitchStatus }) => {
  return (
    <ScreenContainer
      contentOffsetTop={0}
      gradientColors={[
        '#FC98A7',
        '#FD696C',
      ]}
      gradientHeight={matches.length !== 0
        ? DEVICE_HEIGHT * 2 / 5
        : DEVICE_HEIGHT * 3 / 4}
    >
      <Space size={10}/>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          bold
          fontSize={36}
          color="#ffffff"
        >
          Prospects
        </Text>
        <SwitchCustom
          value={prospectSwitchStatus}
          onSwitch={() => {
            toggleProspectSwitch();
            navigation.navigate('StartupIndex');
          }}
          iconActive={toggled => ({
            source: toggled ? favoriteIcon : magnifyingGlassIcon,
            props: {
              fill: toggled ? '#FC95A7' : colors._darkblue,
            },
          })}
          iconInactive={toggled => ({
            source: toggled ? magnifyingGlassIcon : favoriteIcon,
            props: {
              fill: '#ffffff',
            },
          })}
        />
      </View>
      <Space size={20}/>
      <ProspectDeckSwiper/>
      <Space size={30}/>
    </ScreenContainer>
  );
};

const mapStateToProps = (state) => ({
  matches: getStartupMatches(state),
  prospectSwitchStatus: getProspectSwitchStatus(state),
});

export default compose(
  withUser,
  ensureAndroidCloseButton,
  connect(mapStateToProps, { toggleProspectSwitch }),
)(ProspectCards);
