import React from 'react';
import { View } from 'react-native';

import styles from '../styles';
import Button from 'components/common/Button';

const CloseBtn = ({ onPress }) => (
  <View
    style={styles.modalRejectBtnContainer}
  >
    <Button
      type="secondary"
      onPress={onPress}
      style={[
        {
          width: 260,
          height: 40
        }
      ]}
    >
      I do not agree
    </Button>
  </View>
);

export default CloseBtn;