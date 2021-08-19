import { YellowBox } from 'react-native';

// temporary disabled deprecated lifecycle warnings for some third party modules
YellowBox.ignoreWarnings([
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps'
]);