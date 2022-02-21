import { StyleSheet } from 'react-native';
import { spacing } from 'shared/utils/styles';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { metrics } = useTheme();

  return StyleSheet.create({
    container: {
      marginHorizontal: spacing(1),
      width: metrics.posterWidth,
    },
    caption: {
      padding: spacing(1),
    },
  });
}
