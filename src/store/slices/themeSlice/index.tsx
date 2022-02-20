import { createSlice } from '@reduxjs/toolkit';
import Storage from 'data/Storage';
import { darkColors, lightColors } from 'shared/styles/colors';
import { metrics } from 'shared/styles/metrics';
import { useSelector } from 'store/hooks';

const isDarkMode = Storage.getData('@darkMode');

const initialState = {
  isDark: isDarkMode === false ? false : true,
  colors: isDarkMode === false ? lightColors : darkColors,
  metrics,
};

export const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      if (state.isDark) {
        state.isDark = false;
        state.colors = lightColors;
      } else {
        state.isDark = true;
        state.colors = darkColors;
      }
    },
  },
});

export const { toggleTheme } = slice.actions;

export const useTheme = () => useSelector(state => state.theme);

export default slice.reducer;
