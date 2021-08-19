import { StyleSheet } from 'react-native';

import colors from 'styles/colors';
import { DEVICE_WIDTH } from 'styles/metrics';

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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  // styles when there is no data
  logo_nodata: {
    marginTop: 60,
    width: 30,
    height: 40,
  },
  title_nodata: {
    marginTop: 10,
    fontSize: 30,
    lineHeight: 40,
    color: '#ffffff',
  },
  description_nodata: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 15,
  },
  loading_nodata: {
    width: 250,
    height: 250,
  },
  // styles when there is data to show
  title: {
    fontSize: 36,
    color: '#ffffff',
  },
  preview: {
    height: 148,
    zIndex: 1,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  totalLabel: {
    fontSize: 12,
    color: colors._gray,
  },
  name: {
    fontSize: 17,
  },
  startuplogo: {
    width: 54,
    height: 54,
    position: 'absolute',
    top: 300 - 27,
    left: 16,
    zIndex: 3,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    borderColor: 'transparent',
  },
  tag: {
    fontSize: 12,
    color: colors._gray,
    width: (DEVICE_WIDTH - 64) / 2,
    paddingBottom: 10
  },
  amount: {
    fontFamily: 'ProximaNova_Bold',
    fontSize: 12,
    color: '#ffffff',
  },
  progressbar: {
    alignSelf: 'stretch',
  },
  titleContainer: {
    borderRadius: 10,
    paddingBottom: 27,
    paddingTop: 54,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
  },
  investorsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 15,
    height: 25
  },
  goalContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipInButton: {
    width: 192,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  }
});