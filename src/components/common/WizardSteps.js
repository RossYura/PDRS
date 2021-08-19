import React from 'react';
import { View } from 'react-native';

import { HorizontalLine } from './elements/common';
import Circle from 'components/common/elements/Circle';

const getStepElements = (step) => {
  switch (step) {
  case 0: {
    return (
      <React.Fragment>
        <Circle color='#ffffff'/>
        <HorizontalLine color='rgba(255, 255, 255, 0.5)' />
        <Circle color='rgba(255, 255, 255, 0.5)'/>
        <HorizontalLine color='rgba(255, 255, 255, 0.5)' />
        <Circle color='rgba(255, 255, 255, 0.5)'/>
        <HorizontalLine color='rgba(255, 255, 255, 0.5)' />
        <Circle color='rgba(255, 255, 255, 0.5)'/>
      </React.Fragment>
    );
  }
  case 1: {
    return (
      <React.Fragment>
        <Circle color='#ffffff'/>
        <HorizontalLine color='#ffffff' />
        <Circle color='#ffffff'/>
        <HorizontalLine color='rgba(255, 255, 255, 0.5)' />
        <Circle color='rgba(255, 255, 255, 0.5)'/>
        <HorizontalLine color='rgba(255, 255, 255, 0.5)' />
        <Circle color='rgba(255, 255, 255, 0.5)'/>
      </React.Fragment>
    );
  }
  case 2: {
    return (
      <React.Fragment>
        <Circle color='#ffffff'/>
        <HorizontalLine color='#ffffff' />
        <Circle color='#ffffff'/>
        <HorizontalLine color='#ffffff' />
        <Circle color='#ffffff'/>
        <HorizontalLine color='rgba(255, 255, 255, 0.5)' />
        <Circle color='rgba(255, 255, 255, 0.5)'/>
      </React.Fragment>
    );
  }
  case 3: {
    return (
      <React.Fragment>
        <Circle color='#ffffff'/>
        <HorizontalLine color='#ffffff' />
        <Circle color='#ffffff'/>
        <HorizontalLine color='#ffffff' />
        <Circle color='#ffffff'/>
        <HorizontalLine color='#ffffff' />
        <Circle color='#ffffff'/>
      </React.Fragment>
    );
  }
  default: {
    return null;
  }
  }
};

const WizardSteps = ({ step = 0 }) => (
  <View 
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    }}
  >
    {
      getStepElements(step)
    }
  </View>
);

export default WizardSteps;
