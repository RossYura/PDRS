import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from 'styles/metrics';
import colors from 'styles/colors';

export default StyleSheet.create({
  dismissInput: {
    backgroundColor: '#ffffff',
    color: colors._gray,
    fontSize: 12,
    fontFamily: 'ProximaNova_Regular',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors._lightgray,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1
  },
  investedTodayContainer: {
    alignItems: 'center',
    borderRadius: 11,
    flexDirection: 'row',
    flex: 1,
    width: DEVICE_WIDTH - 32 - 64,
  },
  investedTodayItem: {
    width: (DEVICE_WIDTH - 32 - 64) / 2,
  },
  amountText: {
    fontSize: 20,
    color: colors._deepblue,
    width: 110,
    textAlign: 'center',
  },
  amountChangeButton: {
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.205611)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    overflow: 'visible',
  },
  radioContainer: {
    width: DEVICE_WIDTH - 32,
    backgroundColor: '#ffffff',
    overflow: 'visible',
    flex: 1,
  },
  mainInnerContainer: {
    position: 'absolute',
    top: DEVICE_HEIGHT / 5 - 10,
    bottom: 20,
    right: 16,
    left: 16,
    flex: 1,
  },
  mainContainer: {
    position: 'absolute',
    top: Constants.statusBarHeight,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    overflow: 'visible',
    flex: 1,
  },
  modalInnerContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
    paddingHorizontal: 0,
  },
  imageContainer: {
    alignSelf: 'stretch',
    height: DEVICE_HEIGHT / 2,
    alignItems: 'center',
  },
  back: {
    position: 'absolute',
    top: 0,
    left: 20,
  },
  head: {
    marginTop: 40,
    fontSize: 36,
    color: '#ffffff',
    textAlign: 'center',
  },
  subHead: {
    marginTop: 12,
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
  },
  labelText: {
    color: colors._darkblue,
    fontSize: 14,
    fontFamily: 'ProximaNova_Regular',
    minWidth: 100,
  },
  mainText: {
    color: colors._darkblue,
    fontSize: 14,
    fontFamily: 'ProximaNova_Bold',
  },
  licenseText: {
    paddingLeft: 10,
    paddingRight: 40,
    width: '90%',
    flexWrap: 'wrap',
    fontSize: 14,
    fontFamily: 'ProximaNova_Regular',
    color: colors.black,
  },
  mainCard: {
    width: DEVICE_WIDTH - 32,
    height: DEVICE_WIDTH - 86,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.205611)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    overflow: 'visible',
    paddingHorizontal: 32,
    paddingVertical: 20,
    justifyContent: 'space-around',
    elevation: 2,
    borderColor: 'transparent',
  },
});