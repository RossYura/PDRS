import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import Button from './Button';

const GradientButton = ({children, ...props}) => {
  return (
    <Button
      {...props}
      content={(
        <LinearGradient
          colors={
            ['#0082AB', '#431377',]
          }
          start={[0, 0]}
          end={[0, 1]}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {children}
        </LinearGradient>
      )}
    />
  );
};

export default GradientButton;