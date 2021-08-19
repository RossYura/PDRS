import { StyleSheet } from 'react-native';
import colors from './colors';
import { SCREEN_PADDING_HORIZONTAL } from './metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    opacity: 0.98,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginHorizontal: 32,
    marginTop: 128,
    marginBottom: 32,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  input: {
    height: 40,
    borderColor: colors.grayBorder,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    fontSize: 16,
    color: colors.black,
    fontFamily: 'ProximaNova_Regular',
    backgroundColor: 'rgba(101, 110, 120, 0.01)'
  },
  inputText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: 'ProximaNova_Regular',
  },
  inputSwitch: {
    height: 40,
    color: '#4e5961',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginVertical: 5,
  },
  headerText: {
    fontSize: 36,
    fontWeight: '200',
    textAlign: 'center',
    color: colors.black,
  },
  subHeaderText: {
    fontSize: 22,
    fontWeight: '200',
    textAlign: 'left',
  },
  bodyText: {
    fontSize: 16,
    color: colors._gray,
    fontFamily: 'ProximaNova_Regular',
  },
  backgroundBodyText: {
    fontSize: 16,
    color: colors.placeholderGray,
    fontFamily: 'ProximaNova_Regular',
  },
  buttonTextDefault: {
    color: '#ffffff',
  },
  buttonTextDisabled: {
    color: '#7f8c8d',
  },
  buttonTextDanger: {
    color: '#e74c3c',
  },
  buttonDefault: {
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors._blue,
    padding: 5,
    marginVertical: 16,
  },
  buttonDisabled: {
    height: 40,
    backgroundColor: colors.lightgray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginVertical: 16,
  },
  buttonDanger: {
    height: 40,
    borderColor: '#e74c3c',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginVertical: 16,
  },
  buttonRound: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: '#E0E0E0',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginVertical: 16,
  },
  buttonRoundDisabled: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: '#ecf0f1',
    backgroundColor: '#ecf0f1',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginVertical: 16,
  },
  inlineImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  link: {
    color: colors._gray,
    textDecorationLine: 'underline',
    fontSize: 15
  }
});
