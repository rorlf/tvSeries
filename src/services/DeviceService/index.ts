import { Dimensions, Platform } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;

export const isAndroid = Platform.OS === 'android';
