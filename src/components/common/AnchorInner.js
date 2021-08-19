import React from 'react';

import NavLink from 'components/common/NavLink';

const AnchorInner = ({
  href,
  children,
  returnRoute = 'App',
  returnRouteParams = {},
  ...NavLinkProps
}) => {
  return (
    <NavLink
      to="WebViewer"
      params={{
        href,
        webViewerPassedProps: {
          goBackUrl: returnRoute,
          params: returnRouteParams
        },
      }}
      {...NavLinkProps}
    >
      {children}
    </NavLink>
  );
};

export default AnchorInner;