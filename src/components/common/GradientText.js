import React from 'react';
import { View } from 'react-native';
import { 
  Svg, 
  Text, 
  Defs, 
  LinearGradient, 
  Stop,
} from 'react-native-svg';

const GradientText = ({
  text, 
  svgHeight, 
  svgWidth, 
  fontSize, 
  viewStyle,
  fontWeight = 'bold',
  position = 'middle',
}) => {

  return (
    <View
      style={viewStyle}
    >
      <Svg 
        height={svgHeight}
        width={svgWidth}
      > 
        <Defs>
          <LinearGradient id="blueGradient" x1="0" x2="100%" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#431377" offset={position === 'start' ? '0%' : '50%'}/>
            <Stop stopColor="#0082AB" offset={position === 'start' ? '50%' : '100%'}/>          
          </LinearGradient>
        </Defs>
        <Text 
          fill="url(#blueGradient)"
          stroke="none"
          fontSize={fontSize}
          fontWeight={fontWeight}
          x={svgWidth / 2}
          y={svgHeight / 2 + fontSize/3}
          textAnchor={position}
        >
          {text}
        </Text>
      </Svg>
    </View>
  );
};

export default GradientText;
