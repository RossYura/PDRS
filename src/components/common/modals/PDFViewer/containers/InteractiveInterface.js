import React from 'react';
import { Modal, View } from 'react-native';
import Constants from 'expo-constants';

import CloseBtn from '../components/CloseBtn';
import styles from '../styles';
import ConfirmBtn from '../components/ConfirmBtn';
import RejectBtn from '../components/RejectBtn';
import { LinearGradient } from 'expo-linear-gradient';
import ShareBtn from '../components/ShareBtn';

const InteractivePDFContainer = ({
  visible,
  onHide,
  onShare,
  onConfirm,
  onReject,
  children: pdfReader
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onHide}
  >
    <View
      style={[
        styles.modalExternalContainer,
      ]}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.9)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          zIndex: 2,
          height: Constants.statusBarHeight + 70
        }}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.2)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          height: 120
        }}
      />
      <ShareBtn
        onPress={onShare}
      />
      <CloseBtn
        onPress={onHide}
      />
      <ConfirmBtn
        onPress={onConfirm}
      />
      <RejectBtn
        onPress={onReject}
      />
      <View
        style={[
          styles.readerContainer,
          {
            paddingBottom: 120
          }
        ]}
      >
        {pdfReader}
      </View>
    </View>
  </Modal>
);

export const INTERFACE_TYPE = 'INTERACTIVE_INTERFACE';

export default InteractivePDFContainer;