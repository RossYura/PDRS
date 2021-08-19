import React from 'react';
import { View } from 'react-native';

import styles from '../styles';
import Button from 'components/common/Button';

const CloseBtn = ({ onPress }) => (
  <View
    style={styles.modalSubmitBtnContainer}
  >
    <Button
      onPress={onPress}
      style={[
        {
          width: 260,
          height: 40,
        }
      ]}
    >
      I agree with the terms
    </Button>
  </View>
);

export default CloseBtn;