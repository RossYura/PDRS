import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tabBarContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom:0,
    left: 0,
    right: 0
  },
  tabBarIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  arrowContainer: {
    borderRadius: 15,
    width: 29,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 24, 46, 0.4)'
  }
});