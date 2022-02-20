import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { metrics } = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: metrics.spacing(2),
      alignSelf: 'center',
      paddingHorizontal: metrics.spacing(3),
    },
    text: {
      marginRight: metrics.spacing(2),
    },
  });
}
