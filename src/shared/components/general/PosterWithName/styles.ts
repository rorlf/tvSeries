import { StyleSheet } from 'react-native';
import { spacing } from 'shared/utils/styles';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors, metrics } = useTheme();

  return StyleSheet.create({
    container: {
      marginBottom: spacing(2),
      width: metrics.posterWidth,
    },
    favoriteContainer: {
      top: spacing(1),
      left: spacing(1),
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
      paddingHorizontal: spacing(2),
    },
    info: {
      backgroundColor: colors.posterInfoBackground,
      paddingVertical: spacing(3),
    },
  });
}
