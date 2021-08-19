import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { isEmpty } from 'utils/common';

import globalStyles from 'styles';

export const FallbackLoader = () => (
  <View
    style={[
      globalStyles.container,
      {
        justifyContent: 'center',
        alignItems: 'center',
      },
    ]}
  >
    <ActivityIndicator/>
  </View>
);

const ensurePreload = ({ requiredProps = [], Fallback = () => null }) =>
  Component => class EnsureWrapper extends React.Component {

    render () {
      return requiredProps.every(requiredProp => !isEmpty(this.props[requiredProp]))
        ? <Component {...this.props}/>
        : <Fallback {...this.props}/>;
    }
  };

export default ensurePreload;