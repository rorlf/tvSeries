import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors } = useTheme();

  return StyleSheet.create({
    text: {
      color: colors.textPrimary,
      fontSize: 14,
    },
  });
}
