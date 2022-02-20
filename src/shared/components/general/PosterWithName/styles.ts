import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors, metrics } = useTheme();

  return StyleSheet.create({
    container: {
      marginBottom: metrics.spacing(2),
      width: metrics.posterWidth,
    },
    favoriteContainer: {
      top: metrics.spacing(1),
      left: metrics.spacing(1),
      position: 'absolute',
      backgroundColor: colors.overlay,
      height: 32,
      width: 32,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      textAlign: 'center',
      flex: 1,
      paddingHorizontal: metrics.spacing(2),
    },
    info: {
      backgroundColor: colors.posterInfoBackground,
      paddingVertical: metrics.spacing(3),
    },
  });
}
