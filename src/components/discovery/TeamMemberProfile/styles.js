import { StyleSheet } from 'react-native';
import colors from 'styles/colors';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  back: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 0,
    padding: 5
  },
  name: {
    fontFamily: 'ProximaNova_Bold',
    fontSize: 30,
    fontWeight: '200', 
    textAlign: 'center',
    marginTop: 24
  },
  description: {
    fontFamily: 'ProximaNova_Regular',
  },
  job: {
    fontFamily: 'ProximaNova_Regular',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 6,
  },
  positionContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    marginTop: 3
  },
  positionList: {
    flex: 1,
    marginLeft: 20,
  },
  position: {
    fontFamily: 'ProximaNova_Bold',
    alignSelf: 'stretch',
    marginBottom: 4
  },
  year: {
    alignSelf: 'stretch',
    marginBottom: 10
  },
  borderBottom: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginBottom: 16
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 2
  },
  social: {
    fontStyle: 'italic',
    color: '#56BA93'
  },
  expertiseContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  expertiseContent: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: 20
  },
  expertiseTag: {
    backgroundColor: colors._blue,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 13,
    borderWidth: 0,
    maxHeight: 47,
    marginRight: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  expertiseTagText: {
    fontSize: 12,
    fontFamily: 'ProximaNova_Regular',
    color: '#ffffff'
  },
  body: {
    fontFamily: 'ProximaNova_Regular',
    fontSize: 16,
    color: '#4e5961'
  },
  profilePicContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});