import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FloatingAction } from 'react-native-floating-action';

import { hideModal } from 'redux/common/actions';
import { getModalParamsByName } from 'redux/common/selectors';
import Text from 'components/common/Text';

let fabDisappearTimeout;

const FAB = ({
  modalParams: {
    visible,
    content
  },
  hideModal,
  x = 20,
  y = 20,
  TextProps = {}
}) => {

  useEffect(() => {
    clearTimeout(fabDisappearTimeout);
    fabDisappearTimeout = setTimeout(() => {
      hideModal();
    }, 1500);
  });

  return (
    <FloatingAction
      showBackground={false}
      visible={visible}
      buttonSize={80}
      floatingIcon={(
        <Text
          color="#ffffff"
          {...TextProps}
        >
          {content}
        </Text>
      )}
      distanceToEdge={{
        vertical: y,
        horizontal: x,
      }}
      onPressMain={() => {
        hideModal();
        clearTimeout(fabDisappearTimeout);
      }}
    />
  );
};

export default compose(
  connect(
    state => (
      {
        modalParams: getModalParamsByName(state)('fab'),
      }
    ),
    {
      hideModal: () => hideModal('fab'),
    },
  ),
)(FAB);
