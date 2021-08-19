import PhoneInput from 'react-native-phone-input';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';

import withInputLabelContainer from 'containers/InputLabelContainer';

export default compose(
  withProps({
    labelColor: '#ffffff'
  }),
  withInputLabelContainer,
)(PhoneInput);
