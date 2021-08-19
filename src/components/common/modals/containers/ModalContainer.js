import React, { useCallback } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { DEVICE_WIDTH, SMALL_DEVICE_ANDROID } from 'styles/metrics';
import { DEF_WIDTH } from 'components/common/Card';
import { getModalParamsByName } from 'redux/common/selectors';
import { hideModal as hideModalActionCreator } from 'redux/common/actions';

const topPadding = SMALL_DEVICE_ANDROID ? 180 : 240;

const ModalContainer = ({ name, children, cardStyle }) => {
  const dispatch = useDispatch();
  const { visible } = useSelector(state => getModalParamsByName(state)(name));
  const hideModal = useCallback(() => {
    dispatch(hideModalActionCreator(name));
  }, []);

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
          cardStyle
        ]}
      >
        {children}
      </View>
    </Modal>
  );
};

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

export default ModalContainer;