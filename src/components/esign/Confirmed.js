import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Image, View } from 'react-native';
import SvgUri from 'expo-svg-uri';

import Text from 'components/common/Text';
import ScreenContainer from 'containers/ScreenContainer';
import Button from 'components/common/Button';
import withUser from 'HOCs/withUser';
import { signUserDocuments } from 'redux/user/actions';
import headerLogoIcon from 'assets/images/header_logo.svg';
import { DEVICE_HEIGHT } from '../../styles/metrics';
import Space from 'components/common/Space';
import rocketIco from 'assets/images/rocket.png';

class ESignConfirmScreen extends React.Component {

  handleSubmit = async () => {
    const { user: { userId } } = this.props;
    await this.props.signUserDocuments(userId);
  };

  static GRADIENT_HEIGHT = DEVICE_HEIGHT * 2 / 3 < 400 ? 400 : DEVICE_HEIGHT * 2 / 3;

  render() {
    const { GRADIENT_HEIGHT } = this.constructor;

    return (
      <ScreenContainer
        align="center"
        gradientHeight={GRADIENT_HEIGHT}
        contentOffsetTop={GRADIENT_HEIGHT/2 - 30}
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
      >
        <Image
          style={{
            height: DEVICE_HEIGHT / 3 + 50,
          }}
          source={rocketIco}
          resizeMode='contain'
        />
        <Text
          textAlign="center"
        >
          Congratulations, you are now officially a part of the Pitchdrive
          investor community!
        </Text>
        <Space size={10}/>
        <Button
          text="Let's get started"
          onPress={this.handleSubmit}
          width={212}
          height={56}
        />
      </ScreenContainer>
    );
  }
}

export default compose(
  connect(null, { signUserDocuments }),
  withUser,
)(ESignConfirmScreen);