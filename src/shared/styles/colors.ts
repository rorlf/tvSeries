const defaultColors = {
  primary: '#ffff00',
  primaryDark: '#c7cc00',
  primaryLight: '#ffff5a',
  placeholder: '#8d8d8d',
  overlay: 'rgba(98, 114, 123,0.7)',
};

export const lightColors = {
  ...defaultColors,
  textPrimary: '#000000',
  screenBackground: '#9fa8da',
  navigationBar: '#9fa8da',
  inactiveIcon: 'rgba(255, 255, 255, 0.8)',
  favorite: '#ffff00',
  error: '#d32f2f',
  textMessage: '#ffffff',
  messageBackground: '#000000',
  searchInputBackground: 'rgba(255,255,255,0.5)',
  posterInfoBackground: '#ffffff',
};

export const darkColors: ThemeColors = {
  ...defaultColors,
  textPrimary: '#ffffff',
  screenBackground: '#102027',
  navigationBar: '#102027',
  inactiveIcon: 'rgba(255, 255, 255, 0.5)',
  favorite: '#ffff00',
  error: '#d32f2f',
  textMessage: '#000000',
  messageBackground: '#ffffff',
  searchInputBackground: 'rgba(255,255,255,0.05)',
  posterInfoBackground: '#000000',
};

type ThemeColors = typeof lightColors;
