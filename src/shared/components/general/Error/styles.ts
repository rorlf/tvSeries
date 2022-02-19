import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { metrics, colors } = useTheme();

  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    tryAgainContainer: {
      borderRadius: metrics.spacing(3),
      borderWidth: 1,
      borderColor: colors.inactiveIcon,
      paddingHorizontal: metrics.spacing(4),
      paddingVertical: metrics.spacing(2),
      marginTop: metrics.spacing(10),
    },
  });
}
