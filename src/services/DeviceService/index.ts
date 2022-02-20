import { Dimensions, Platform } from 'react-native';
import TouchID from 'react-native-touch-id';

export const deviceWidth = Dimensions.get('window').width;

export const isAndroid = Platform.OS === 'android';

export async function checkIsFingerprintAvailable() {
  try {
    await TouchID.isSupported();
    return true;
  } catch (error) {
    return false;
  }
}
