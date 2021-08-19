import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg from 'expo-svg-uri';

import { goBack } from 'services/navigation/actions';
import styles from '../styles';
import backIco from 'assets/images/back.svg';

const ArrowBack = ({ onPress = () => goBack(), style }) => (
  <TouchableOpacity
    style={[
      styles.arrowContainer,
      style,
    ]}
    onPress={onPress}
  >
    <Svg
      width="21"
      height="21"
      source={backIco}
    />
  </TouchableOpacity>
);

export default ArrowBack;