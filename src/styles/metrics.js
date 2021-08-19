import { Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
export const DEVICE_HEIGHT_NO_STATUS_BAR = DEVICE_HEIGHT - Constants.statusBarHeight;
export const SCREEN_PADDING_HORIZONTAL = 16;
export const SMALL_DEVICE_ANDROID = Platform.OS === 'android' && Dimensions.get('window').height <= 640;
export const SCREEN_SCALE = Platform.OS === 'android' && Dimensions.get('window').scale;
