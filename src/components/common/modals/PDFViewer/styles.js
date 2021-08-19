import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  reader: {
    paddingTop: 0,
  },
  readerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 1,
    paddingTop: Constants.statusBarHeight + 70
  },
  modalExternalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalShareIconContainer: {
    position: 'absolute',
    left: 10,
    top: Constants.statusBarHeight + 7,
    zIndex: 999999,
    padding: 5,
    paddingLeft: 10
  },
  shareMask: {
    opacity: 0.5,
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  modalCloseIconContainer: {
    position: 'absolute',
    right: 10,
    top: Constants.statusBarHeight + 10,
    zIndex: 999999
  },
  iconOpacity: {
    justifyContent: 'center', alignItems: 'center',
  },
  modalSubmitBtnContainer: {
    position: 'absolute',
    bottom: 70,
    right: 0,
    left: 0,
    alignItems: 'center',
    zIndex: 3
  },
  modalRejectBtnContainer: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0,
    alignItems: 'center',
    zIndex: 3
  },
});