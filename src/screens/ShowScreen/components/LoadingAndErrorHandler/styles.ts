import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { metrics } = useTheme();

  return StyleSheet.create({
    loading: {
      paddingVertical: metrics.spacing(5),
    },
  });
}
