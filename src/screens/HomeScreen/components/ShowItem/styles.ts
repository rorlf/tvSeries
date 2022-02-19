import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors, metrics } = useTheme();

  return StyleSheet.create({
    container: {
      width: metrics.cardWidth,
      marginBottom: metrics.spacing(2),
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
    image: {
      width: '100%',
      aspectRatio: 42 / 59,
      height: undefined,
    },
    name: {
      textAlign: 'center',
      flex: 1,
    },
    info: {
      backgroundColor: '#000000',
      paddingVertical: metrics.spacing(3),
    },
  });
}
