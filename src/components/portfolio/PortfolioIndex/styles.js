import { StyleSheet } from 'react-native';

import colors from 'styles/colors';

export default StyleSheet.create({
  nullStatisticPlaceholderText: {
    textAlign: 'center',
    color: colors._darkblue,
    marginVertical: 60
  },
  progressBarLabel: {
    position: 'absolute',
    fontSize: 14,
    left: 0,
  },
  progressBar: {
    marginLeft: 140,
  },
  progressContainer: {
    marginBottom: 20,
    position: 'relative',
    height: 20,
    justifyContent: 'center',
  },
  headerContainer: {
  },
  chartTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 112 - 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
});
