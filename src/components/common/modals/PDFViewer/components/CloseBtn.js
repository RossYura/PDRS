import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import styles from '../styles';

const CloseBtn = ({onPress}) => (
  <View
    style={styles.modalCloseIconContainer}
  >
    <TouchableOpacity
      style={styles.iconOpacity}
      onPress={onPress}
    >
      <FontAwesome
        name='times'
        size={50}
        color='#ffffff'
      />
    </TouchableOpacity>
  </View>
);

export default CloseBtn;