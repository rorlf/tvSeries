import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles(hasOnPress) {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    value: {
      flex: 1,
      color: hasOnPress ? colors.favorite : colors.textPrimary,
    },
  });
}
