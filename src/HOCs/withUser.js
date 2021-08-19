import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { getCurrentUser } from 'redux/user/selectors';

const withUser = Component => compose(
  connect(state => ({
    user: getCurrentUser(state),
  })),
)(Component);

export default withUser;
