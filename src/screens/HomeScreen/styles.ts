import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors, metrics } = useTheme();

  return StyleSheet.create({
    screen: {
      flex: 1,
      padding: metrics.screenPadding,
      backgroundColor: colors.screenBackground,
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
    error: {
      flex: 1,
    },
    footer: {
      marginBottom: metrics.footer,
    },
  });
}
