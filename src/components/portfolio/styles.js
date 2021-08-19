import { Dimensions, StyleSheet } from 'react-native';

let dm = Dimensions.get('screen');

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FCFCFC'
  },
  container: {
    flex: 1
  },
  initialContainer: {
    flex: 1,
    paddingTop: 20
  },
  imageContainer: {
    alignSelf: 'stretch',
    height: 480,
    alignItems: 'center',
    justifyContent: 'center'
  },
  back: {
    position: 'absolute',
    top: 25,
    left: 20,
    padding: 5
  },
  logo: {
    alignSelf: 'stretch',
    height: 60
  },
  name: {
    marginTop: 10,
    fontFamily: 'ProximaNova_Bold',
    fontSize: 40,
    color: '#ffffff'
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
    borderBottomLeftRadius: 15
  },
  expireText: {
    fontFamily: 'ProximaNova_Regular',
    fontSize: 12,
    color: '#ffffff'
  },
  expireCount: {
    fontFamily: 'ProximaNova_Bold',
    fontSize: 36,
    color: '#ffffff'
  },
  timeRemaining: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    fontFamily: 'ProximaNova_Regular',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)'
  },
  content: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -16,
    padding: 25
  },
  text_big_title: {
    fontFamily: 'ProximaNova_Bold',
    fontSize: 24,
    color: '#393C3F'
  },
  text_big_description: {
    fontFamily: 'ProximaNova_Light',
    fontSize: 18,
    lineHeight: 24,
    color: '#393C3F',
    marginTop: 10
  },
  text_big_header: {
    fontFamily: 'ProximaNova_Regular',
    fontSize: 20,
    color: '#393C3F'
  },
  itemContainer: {
    marginTop: 40,
    alignSelf: 'stretch'
  },
  progressbar: {
    alignSelf: 'stretch',
    marginTop: 15
  },
  goalContent: {
    marginTop: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text_mid_header: {
    fontFamily: 'ProximaNova_Light',
    fontSize: 16,
    lineHeight: 20,
    color: '#393C3F'
  },
  text_mid_amount: {
    fontFamily: 'ProximaNova_Regular',
    fontSize: 18,
    lineHeight: 22,
    color: '#56BA93',
    marginTop: 5
  },
  rightAlign: {
    textAlign: 'right'
  },
  videoContainer: {
    width: dm.width,
    alignSelf: 'center',
    marginTop: 20,
  },
  video: {
    width: dm.width,
    height: 210
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },

  chipinBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#56BA93',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgb(9, 45, 31)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 30,
    position: 'absolute',
    top: -30,
    right: 25
  },
  chipinBtnDynamic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#56BA93',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgb(9, 45, 31)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 30,
    position: 'absolute',
    bottom: 30,
    right: 25
  },
  chipinIcon: {
    width: 21,
    height: 18
  },
  chipinText: { 
    fontFamily: 'ProximaNova_Bold',
    fontSize: 10,
    color: '#ffffff',
    marginTop: 4
  }
});