import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors } = useTheme();

  return StyleSheet.create({
    tabBar: {
      backgroundColor: colors.navigationBar,
    },
  });
}
