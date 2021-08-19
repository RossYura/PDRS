import React from 'react';
import moment from 'moment';

import Text from 'components/common/Text';

const TimeAgeLabel = ({ distance, withImage }) => withImage
  ? (
    <Text
      fontSize={12}
      color="#C4C4C4"
    >
      {`${moment(distance).from(moment())}`}
    </Text>
  ) : (
    <Text
      fontSize={13}
      color="#979797"
      style={{
        position: 'absolute',
        right: 11,
        bottom: 8,
      }}
    >
      {`${moment(distance).from(moment())}`}
    </Text>
  );

export default TimeAgeLabel;