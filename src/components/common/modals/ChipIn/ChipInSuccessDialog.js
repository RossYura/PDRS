import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { BlurView } from 'expo-blur';
import { compose } from 'redux';

import colors from 'styles/colors';
import globalStyles from 'styles';
import Button from 'components/common/Button';
import { StartupActions } from 'redux/actions';
import styles from './styles';
import Space from '../../Space';
import { getModalParamsByName } from 'redux/common/selectors';
import {
  hideModal,
} from 'redux/common/actions';

class ChipInSuccessDialog extends React.Component {

  handleSubmit = async () => {
    const {
      hideModal
    } = this.props;

    hideModal('chipInSuccess');
  };


  render() {
    const {
      modalParams: {
        company = {},
        onHide,
        visible,
      },
    } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onHide}
      >
        <View
          style={[
            globalStyles.container,
            styles.modalInnerContainer,
          ]}
        >
          <ImageBackground
            source={{
              uri: company.companyBannerImage,
            }}
            style={styles.imageContainer}
            resizeMode='cover'
          >
            <BlurView
              tint="light"
              intensity={80}
              style={{
                ...StyleSheet.absoluteFill,
              }}
            />
          </ImageBackground>
          <View
            style={styles.mainContainer}
          >
            <Text style={styles.head}>
              Success
            </Text>
            <View style={{ height: 61 }}/>
            <View
              style={styles.mainInnerContainer}
            >
              <View
                style={[
                  styles.mainCard,
                  {
                    justifyContent: 'space-between',
                    minHeight: 350
                  }
                ]}
              >
                <Text style={{ fontSize: 17 }}>
                  You’ve chipped in!
                </Text>
                <Space size={15}/>
                <Text style={styles.bodyText}>
                  Follow the progress of{' '}
                  <Text
                    style={[styles.bodyText, { color: colors._darkblue }]}
                  >
                    {company.name}
                  </Text>
                  {' '}in your portfolio.
                  {'\n'}{'\n'}
                  When the round is full you'll get a notification with
                  further instructions for the payment procedure.
                  {'\n'}{'\n'}
                  If the round is not filled up, it might be extended or
                  canceled. You will be notified if this happens.
                </Text>
                <Space size={15}/>
                <Button
                  width={190}
                  height={58}
                  gradient
                  text="Got it!"
                  onPress={this.handleSubmit}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default compose(
  connect(
    state => (
      {
        modalParams: getModalParamsByName(state)('chipInSuccess'),
      }
    ),
    {
      ...StartupActions,
      hideModal
    },
  ),
)(ChipInSuccessDialog);