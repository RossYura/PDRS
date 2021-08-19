import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { 
  DEVICE_WIDTH,
  SMALL_DEVICE_ANDROID,
} from 'styles/metrics';
import { DEF_WIDTH } from 'components/common/Card';
import { hideModal } from 'redux/common/actions';
import { getModalParamsByName } from 'redux/common/selectors';

const TipModal = ({
  modalParams: {
    visible,
    content,
  },
  hideModal,
}) => {
  const [topPadding, setTopPadding] = useState(SMALL_DEVICE_ANDROID ? 180 : 240);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
      Keyboard.dismiss();
    };
  }, []);

  const _keyboardDidShow = useCallback((e) => {
    const additionalPadding = e.endCoordinates.height / 2;
    setTopPadding(topPadding - additionalPadding);
  }, [topPadding]);

  const _keyboardDidHide = useCallback(() => {
    setTopPadding(SMALL_DEVICE_ANDROID ? 180 : 240);
  }, [topPadding]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={hideModal}
    >
      <TouchableWithoutFeedback
        onPress={hideModal}
      >
        <View
          style={styles.modalExternalContainer}
        />
      </TouchableWithoutFeedback>
      <View     
        style={[
          styles.modalCard,
          {
            top: topPadding,
            left: (DEVICE_WIDTH - DEF_WIDTH) / 2,
            right: (DEVICE_WIDTH - DEF_WIDTH) / 2
          },
        ]}
      >
        {content}
      </View>
    </Modal>
  );
};

export default compose(
  connect(
    state => (
      {
        modalParams: getModalParamsByName(state)('tipModal'),
      }
    ),
    {
      hideModal: () => hideModal('tipModal'),
    },
  ),
)(TipModal);

const styles = StyleSheet.create({
  modalCard: {
    position: 'absolute',
    zIndex: 5,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  modalExternalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
  },
});