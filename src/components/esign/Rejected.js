import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { 
  Image, 
  View, 
  Linking,
} from 'react-native';
import SvgUri from 'expo-svg-uri';

import Text from 'components/common/Text';
import ScreenContainer from 'containers/ScreenContainer';
import Button from 'components/common/Button';
import { signUserDocuments } from 'redux/user/actions';
import { 
  showModal, 
  hideModal,
} from 'redux/common/actions';
import TextLink from 'components/common/NavLink';
import headerLogoIcon from 'assets/images/header_logo.svg';
import { DEVICE_HEIGHT } from 'styles/metrics';
import rocketIco from 'assets/images/rocket.png';
import Space from 'components/common/Space';

class ESignRejectScreen extends React.Component {

  handleSubmit = async () => {
    const { navigation } = this.props;
    navigation.navigate('ESignMain');
  };

  static GRADIENT_HEIGHT = DEVICE_HEIGHT * 2 / 3 < 400 ? 400 : DEVICE_HEIGHT * 2 / 3;

  render() {
    const { GRADIENT_HEIGHT } = this.constructor;

    return (
      <ScreenContainer
        navHeader
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
        >
          Please{' '}
          <TextLink
            simpleText
            onPress={() => Linking.openURL('mailto:team@pitchdrive.com')}
          >
            contact us
          </TextLink>{' '}
          to tell us why you don’t agree.
        </Text>
        <Space size={20}/>
        <Button
          text="Back to overview"
          onPress={this.handleSubmit}
          width={212}
          height={56}
        />
      </ScreenContainer>
    );
  }
}

export default compose(
  connect(null, { signUserDocuments, showModal, hideModal }),
)(ESignRejectScreen);