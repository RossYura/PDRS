import React from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';

import generalStyles from 'styles';
import colors from 'styles/colors';
import { isIphoneX } from 'utils/device';

export default class PermissionsRequestModal extends React.Component {

  onSubmit = async () => {
    const { onCancel, onSubmit } = this.props;
    try {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
      onCancel();
      onSubmit();
    } catch (e) {
      onCancel();
    }
  };

  render() {
    const { visible, onCancel, tip } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onCancel}
      >
        <TouchableWithoutFeedback
          onPress={onCancel}
        >
          <View
            style={styles.modalExternalContainer}
          />
        </TouchableWithoutFeedback>
        <View
          style={[
            generalStyles.modalContainer,
            styles.container,
          ]}
        >
          {tip}
          <View
            style={styles.buttonsRowContainer}
          >
            <TouchableOpacity
              onPress={onCancel}
            >
              <View
                style={[
                  generalStyles.buttonRound,
                  {
                    marginVertical: 0,
                  },
                ]}
              >
                <FontAwesome
                  name={'times'}
                  size={35}
                  style={{ color: '#e74c3c' }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.onSubmit}
            >
              <View
                style={[
                  generalStyles.buttonRound,
                  {
                    marginVertical: 0,
                  },
                ]}
              >
                <FontAwesome
                  name={'check'}
                  size={35}
                  style={{ color: '#56BA93' }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalExternalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7);',
    position: 'absolute',
    paddingTop: isIphoneX() ? 50 : 15,
    zIndex: 1,
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'space-between',
    borderColor: colors.black,
    borderWidth: 1,
    paddingVertical: 30,
    paddingHorizontal: 30,
    zIndex: 2,
  },
  buttonsRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});