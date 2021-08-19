import withProps from 'recompose/withProps';
import CircularElement from './CircularTouchableOpacity';

import questionIcon from 'assets/images/question.svg';

export default withProps({
  source: questionIcon,
})(CircularElement);