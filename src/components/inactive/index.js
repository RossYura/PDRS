import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import SvgUri from 'expo-svg-uri';
import { useDispatch } from 'react-redux';

import Text from 'components/common/Text';
import ScreenContainer from 'containers/ScreenContainer';
import {
  DEVICE_HEIGHT, DEVICE_WIDTH,
} from 'styles/metrics';
import Space from 'components/common/Space';
import headerLogoIcon from 'assets/images/header_logo.svg';
import treeImage from 'assets/images/tree.png';
import GradientButton from '../common/GradientButton';
import NetworkService from '../../services/network';
import useUser from '../../hooks/useUser';
import { setUser } from '../../redux/user/actions';

const GRADIENT_HEIGHT = DEVICE_HEIGHT / 2 < 460
  ? 460
  : DEVICE_HEIGHT / 2;

const InactiveScreen = () => {
  const { id } = useUser();
  const dispatch = useDispatch();
  const handleUserReactivate = useCallback(() => {
    NetworkService.User()
      .code200(({ data: { user } }) => {
        dispatch(setUser(user));
      })
      .reactivate(id);
  }, []);

  return (
    <ScreenContainer
      backgroundHeader
      gradientHeight={GRADIENT_HEIGHT}
      contentOffsetTop={290}
      align="center"
      header={
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: 30,
          }}
        >
          <SvgUri source={headerLogoIcon}/>
          <Space size={18}/>
          <Text
            fontSize={22}
            color="#ffffff"
          >
            PITCHDRIVE
          </Text>
          <Space size={38}/>
          <Text
            fontSize={14}
            color="#ffffff"
            textAlign="center"
          >
            Looks like you haven’t been here for a while. Maybe something
            happened
            in space and time for you to end up here in this spot. No worries,
            just tap the button below to get going again!
          </Text>
        </View>
      }
    >
      <Image
        style={{
          width: DEVICE_WIDTH - 100,
          flex: 1,
          marginRight: 20,
        }}
        source={treeImage}
        resizeMode='contain'
      />
      <GradientButton
        width={228}
        height={46}
        onPress={handleUserReactivate}
        style={{
          padding: 0,
        }}
      >
        <Text
          fontSize={20}
          color="#ffffff"
        >
          Start me up again!
        </Text>
      </GradientButton>
      <Space size={10}/>
    </ScreenContainer>
  );
};

export default InactiveScreen;