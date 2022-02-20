import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors, metrics } = useTheme();

  return StyleSheet.create({
    tabBar: {
      backgroundColor: colors.navigationBar,
      height: 52,
      paddingBottom: metrics.spacing(1),
      borderTopWidth: 2,
    },
  });
}
