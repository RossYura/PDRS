import { Dimensions, Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export const isIphoneX = () => {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&

    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
};

export function isIPhoneXSize(dim) {
  return dim.height === 812 || dim.width === 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height === 896 || dim.width === 896;
}

export const deviceHasBiometrics = async () => {
  const biometricsAvailable = await LocalAuthentication.supportedAuthenticationTypesAsync();

  return biometricsAvailable.length;
};
