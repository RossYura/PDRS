import React from 'react';
import { Modal, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

import styles from '../styles';
import ShareBtn from '../components/ShareBtn';
import CloseBtn from '../components/CloseBtn';

const OverviewPDFContainer = ({ visible, onHide, onShare, children: pdfReader }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onHide}
    style={styles.modalExternalContainer}
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
    <ShareBtn
      onPress={onShare}
    />
    <CloseBtn
      onPress={onHide}
      style={styles.modalCloseIconContainer}
    />
    <View
      style={styles.readerContainer}
    >
      {pdfReader}
    </View>
  </Modal>
);

export const INTERFACE_TYPE = 'OVERVIEW_INTERFACE_TYPE';

export default OverviewPDFContainer;