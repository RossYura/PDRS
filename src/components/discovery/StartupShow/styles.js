import { Dimensions, StyleSheet, Platform } from 'react-native';

import { DEVICE_HEIGHT } from 'styles/metrics';
import colors from 'styles/colors';

let dm = Dimensions.get('screen');

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  container: {
    flex: 1,
  },
  initialContainer: {
    flex: 1,
    paddingTop: 20,
  },
  titleContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  askUsInput: {
    backgroundColor: '#F7F7F9',
    color: colors._gray,
    fontSize: 15,
    fontFamily: 'ProximaNova_Regular',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors._lightgray,
    paddingLeft: 16,
    paddingRight: 40,
    paddingTop: 16,
    paddingBottom: 13,
  },
  askUsSubmit: {
    width: 24,
    height: 24,
  },
  back: {
    position: 'absolute',
    top: 25,
    left: 20,
    padding: 5,
  },
  logo: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  videoButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        marginTop: -23,
      },
    }),
  },
  videoText: {
    fontSize: 17,
    color: '#ffffff',
    marginRight: 7
  },
  nameContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  name: {
    fontSize: 17,
    color: '#ffffff',
  },
  category: {
    fontSize: 12,
    color: '#ffffff',
  },
  expireContainer: {
    position: 'absolute',
    top: 70,
    right: 0,
    backgroundColor: '#DF2F2E',
    width: 85,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  expireText: {
    fontFamily: 'ProximaNova_Regular',
    fontSize: 12,
    color: '#ffffff',
  },
  expireCount: {
    fontFamily: 'ProximaNova_Bold',
    fontSize: 36,
    color: '#ffffff',
  },
  timeRemaining: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    fontFamily: 'ProximaNova_Regular',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  text_big_title: {
    color: '#90A7BA',
  },
  text_big_description: {
    fontSize: 15,
    color: colors._gray,
    marginTop: 35,
  },
  text_big_header: {
    fontSize: 12,
    color: colors._gray,
    marginBottom: 14
  },
  itemContainer: {
    alignSelf: 'stretch',
  },
  progressbar: {
    alignSelf: 'stretch',
    marginVertical: 15,
  },
  goalContent: {
    marginTop: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_mid_header: {
    fontSize: 13,
    lineHeight: 20,
  },
  text_mid_amount: {
    fontSize: 17,
    color: colors._darkblue,
    marginTop: 5,
  },
  rightAlign: {
    textAlign: 'right',
  },
  videoContainer: {
    width: dm.width,
    alignSelf: 'center',
    marginTop: 20,
  },
  video: {
    width: dm.width,
    height: 210,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  chipInBtn: {
    width: 65,
    height: 65,
    position: 'absolute',
    bottom: - DEVICE_HEIGHT,
    right: 15,
    zIndex: 9
  },
  chipinIcon: {
    width: 21,
    height: 18,
  },
  chipinText: {
    fontFamily: 'ProximaNova_Bold',
    fontSize: 10,
    color: '#ffffff',
    marginTop: 4,
  },
  termContainer: {
    flexDirection: 'row',   
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  termTitle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 0.5,
  },
  termContent: {
    flex: 0.5,
    paddingLeft: 5,
  },
  point: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#90A7BA',
    marginRight: 5,
    marginTop: 5,
  }
});