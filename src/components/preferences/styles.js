import { StyleSheet } from 'react-native';

import { DEVICE_WIDTH } from 'styles/metrics';

export default StyleSheet.create({
  phoneInputText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'ProximaNova_Regular',
  },
  phoneInput: {
    height: 40,
    borderColor: '#ffffff',
    borderRadius: 8,
    backgroundColor: 'rgba(101, 110, 120, 0.01)',
    width: DEVICE_WIDTH - 64,
    maxWidth: 311,
    borderTopWidth: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    borderWidth: 1,
    paddingBottom: 10,
  }
});