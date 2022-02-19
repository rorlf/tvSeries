import { createSlice } from '@reduxjs/toolkit';
import { darkTheme, lightTheme, ThemeState } from 'shared/styles/themes';
import { useSelector } from 'store/hooks';

const initialState: ThemeState = lightTheme;

export const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      if (state.isDark) {
        state = lightTheme;
      } else {
        state = darkTheme;
      }
      return state;
    },
  },
});

export const { toggleTheme } = slice.actions;

export const useTheme = () => useSelector(state => state.theme);

export default slice.reducer;
