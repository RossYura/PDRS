import React from 'react';

import FAB from 'components/common/modals/FAB';

const FABMaskContainer = ({ children, ...FABProps }) => {
  return (
    <>
      {children}
      <FAB {...FABProps}/>
    </>
  );
};

export default FABMaskContainer