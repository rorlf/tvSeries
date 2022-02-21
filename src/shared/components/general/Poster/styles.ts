import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { metrics, colors } = useTheme();

  return StyleSheet.create({
    image: {
      width: metrics.posterWidth,
      aspectRatio: 42 / 59,
      height: undefined,
    },
    noImage: {
      width: metrics.posterWidth,
      aspectRatio: 42 / 59,
      height: undefined,
      backgroundColor: colors.inactiveIcon,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}
