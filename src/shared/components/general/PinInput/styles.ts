import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { metrics, colors } = useTheme();

  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginBottom: metrics.spacing(10),
    },
    cellStyleFocused: {
      borderColor: colors.primary,
    },
  });
}
