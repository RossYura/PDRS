import React from 'react';

import Text from 'components/common/Text';
import colors from 'styles/colors';

export const getGreenWords = (s) => {
  if (!s.includes('*')) {
    return (
      <Text
        fontSize={13}
        color={colors._darkblue}
      >
        {s}
      </Text>
    );
  }

  const reg = /(?:\*)([\w\s]+)(?:\*)/ig;
  let iteration;
  let greenWords = [];

  while ((iteration = reg.exec(s)) !== null) {
    greenWords.push({
      index: iteration.index,
      text: iteration[1],
    });
  }

  return s.split('*')
    .map((text, index) => {
      const isHighlighted = greenWords.find(
        entry => entry.text.toString() === text.toString());

      return (
        <Text
          key={index}
          fontSize={isHighlighted ? 14 : 13}
          color={isHighlighted ? 'green' : colors._darkblue}
          lineHeight={isHighlighted ? 14 : 13.5}
        >
          {text}
        </Text>
      );
    });
};