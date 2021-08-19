import { Dimensions, Platform } from 'react-native';

export const forge = Class => (...params) => new Class(params);

export const isEmpty = struct =>
  !struct
  ||
  (struct.length && struct.length === 0)
  ||
  Object.keys(struct).length === 0;

export const conditionalSwitch = (...switchMap) => {
  const match = switchMap.find(({ condition }) => condition);
  return match.result;
};

conditionalSwitch.CONDITIONS = {
  DEFAULT: true,
};

export const isSmallGradient = (platform, gradientHeight) => {
  return Platform.OS === platform && Dimensions.get('window').height * 3 / 4 < gradientHeight;
};
