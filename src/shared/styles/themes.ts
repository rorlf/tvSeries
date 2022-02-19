import { colors } from './colors';
import { metrics } from './metrics';

export const lightTheme = {
  isDark: false,
  colors,
  metrics,
};

export const darkTheme: ThemeState = {
  isDark: true,
  colors,
  metrics,
};

export type ThemeState = typeof lightTheme;
