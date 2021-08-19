import withProps from 'recompose/withProps';

import TextInput from 'components/common/TextInput';
import { DEVICE_WIDTH } from 'styles/metrics';

export default withProps(props => ({
  labelColor: '#ffffff',
  style: {
    borderColor: '#ffffff',
    width: DEVICE_WIDTH - 64,
    maxWidth: 311,
    color: '#ffffff',
    height: 40,
    ...props.style
  },
}))(TextInput);