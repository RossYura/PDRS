import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  nameContainer: {
    flex: 1,
  },
  subHeaderInfoCell: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBarContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  logoHeader: {
    height: 40,
    width: 40,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    alignSelf: 'stretch',
    height: 435,
    alignItems: 'center',
  },
  back: {
    position: 'absolute',
    top: 25,
    left: 20,
    padding: 5,
  },
  logo: {
    alignSelf: 'stretch',
    height: 60,
  },
  name: {
    marginTop: 10,
    fontSize: 40,
    color: '#ffffff',
  },
  tabViewPaginationHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    overflow: 'visible',
    height: 50,
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
  tabBarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    overflow: 'visible',
    shadowColor: 'rgba(0, 0, 0, 0.205611)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
