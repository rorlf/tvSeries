import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { metrics } = useTheme();

  return StyleSheet.create({
    container: {
      marginHorizontal: metrics.spacing(1),
      width: metrics.posterWidth,
    },
    caption: {
      padding: metrics.spacing(1),
    },
  });
}
