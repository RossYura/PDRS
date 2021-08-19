import withProps from 'recompose/withProps';

import CardOrigin from 'components/common/Card';

export default withProps(props => ({
  style: {
    ...props.style,
  },
  ...props,
}))(CardOrigin);