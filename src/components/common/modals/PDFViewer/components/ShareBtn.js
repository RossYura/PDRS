import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import styles from '../styles';

const ShareBtn = ({ onPress }) => (
  <View
    style={styles.modalShareIconContainer}
  >
    <View style={styles.shareMask}/>
    <TouchableOpacity
      style={styles.iconOpacity}
      onPress={onPress}
    >
      <FontAwesome
        name='share'
        size={30}
        color='#ffffff'
      />
    </TouchableOpacity>
  </View>
);

export default ShareBtn;